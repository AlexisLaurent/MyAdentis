import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Project} from './project.model';
import {ProjectsApiService} from './projects-api.service';
import {Manager} from '../managers/manager.model';
import {Consultant} from '../consultants/consultant.model';
import {ConsultantsApiService} from '../consultants/consultants-api.service';
import {Client} from '../clients/client.model';
import {ClientsApiService} from '../clients/clients-api.service';
import {ClientEmployee} from '../clientEmployees/clientEmployee.model';
import {ClientEmployeesApiService} from '../clientEmployees/clientEmployees-api.service';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {Subscription, forkJoin} from 'rxjs';
import {concatMap, tap, mergeMap, map} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'project-edit-form',
  templateUrl: 'project-edit-form.component.html',
  styleUrls: ['projects.component.css']
})

export class ProjectEditFormComponent implements OnInit {

  projectId: number;

  project = new Project();
  projectsListSubs: Subscription;
  projectForm: FormGroup;

  manager: Manager;

  consultant: Consultant;
  consultantsListSubs: Subscription;
  consultantsList: Consultant[];
  consultantForm: FormGroup;

  client: Client;
  clientsListSubs: Subscription;
  clientsList: Client[];
  clientForm: FormGroup;

  clientEmployee: ClientEmployee;
  clientEmployeesListSubs: Subscription;
  clientEmployeesList: ClientEmployee[];
  clientEmployeeForm: FormGroup;

  constructor(private projectsApi: ProjectsApiService, private consultantsApi: ConsultantsApiService, private clientsApi: ClientsApiService, private clientEmployeesApi: ClientEmployeesApiService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.projectId = parseInt(this.activatedRoute.snapshot.params["id"]);

    this.projectForm = this.formBuilder.group({
      consultantControl: ['', Validators.required],
      clientControl: ['', Validators.required],
      clientEmployeeControl: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    });

    this.consultantForm = this.formBuilder.group({
      firstName: [{value: '', disabled: true}, Validators.required],
      lastName: [{value: '', disabled: true}, Validators.required],
      email: [{value: '', disabled: true}, Validators.required],
      tel: [{value: '', disabled: true}, Validators.required],
    });

    this.clientForm = this.formBuilder.group({
      name: [{value: '', disabled: true}, Validators.required],
      address: [{value: '', disabled: true}, Validators.required],
      cp: [{value: '', disabled: true}, Validators.required],
      city: [{value: '', disabled: true}, Validators.required],
    });

    this.clientEmployeeForm = this.formBuilder.group({
      firstName: [{value: '', disabled: true}, Validators.required],
      lastName: [{value: '', disabled: true}, Validators.required],
      email: [{value: '', disabled: true}, Validators.required],
      tel: [{value: '', disabled: true}, Validators.required],
      title: [{value: '', disabled: true}, Validators.required],
    });

    this.projectsListSubs = this.projectsApi.getDetailedProject(this.projectId)
    .pipe(
      mergeMap(project => 
        forkJoin(
          this.consultantsApi.getConsultants(),
          this.clientsApi.getClients(),
          this.clientEmployeesApi.getClientEmployeesForClient(project.client[0].id)
        )
        .pipe(map(res => ({project, consultants: res[0], clients: res[1], clientEmployees: res[2] })))
      )
    )
    .subscribe(res => {
      this.consultantsList = res.consultants;
      this.clientsList = res.clients;
      this.clientEmployeesList = res.clientEmployees;

      this.manager = res.project.manager[0];
      this.consultant = res.project.consultant[0];
      this.client = res.project.client[0];
      this.clientEmployee = res.project.clientEmployee[0];

      this.projectForm.setValue({
        consultantControl: this.consultant,
        clientControl: this.client,
        clientEmployeeControl: this.clientEmployee,
        start_date: new Date(res.project.start_date),
        end_date: new Date(res.project.end_date),
      });

      this.consultantForm.setValue({
        firstName: this.consultant.firstName,
        lastName: this.consultant.lastName,
        email: this.consultant.email,
        tel: this.consultant.tel,
      });

      this.clientForm.setValue({
        name: this.client.name,
        address: this.client.address,
        cp: this.client.cp,
        city: this.client.city,
      });

      this.clientEmployeeForm.setValue({
        firstName: this.clientEmployee.firstName,
        lastName: this.clientEmployee.lastName,
        email: this.clientEmployee.email,
        tel: this.clientEmployee.tel,
        title: this.clientEmployee.title,
      });
    },
      console.error
    );
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }

  updateProject() {
    this.project.id = this.projectId;
    this.project.manager_id = this.manager.id;
    this.project.consultant_id = this.projectForm.get('consultantControl').value.id === undefined ? this.consultant.id : this.projectForm.get('consultantControl').value.id;
    this.project.client_id = this.projectForm.get('clientControl').value.id === undefined ? this.client.id : this.projectForm.get('clientControl').value.id;
    this.project.clientEmployee_id = this.projectForm.get('clientEmployeeControl').value.id === undefined ? this.clientEmployee.id : this.projectForm.get('clientEmployeeControl').value.id;
    this.project.start_date = this.projectForm.get('start_date').value;
    this.project.end_date = this.projectForm.get('end_date').value;

    this.projectsApi
      .updateProject(this.project)
      .subscribe(
        () => this.router.navigate(['/projects']),
        error => alert(error.message)
      );
  }

  updateClientEmployeeList(client) {
   this.clientEmployeesListSubs = this.clientEmployeesApi
    .getClientEmployeesForClient(client.id)
    .subscribe(res => {
        this.clientEmployeesList = res;
        this.clientEmployeeForm.setValue({
          firstName: '',
          lastName: '',
          email: '',
          tel: '',
          title: '',
        });
        this.projectForm.controls['clientEmployeeControl'].setValue(null);
      },
      console.error
    );
  }
}

export class DetailedProject {
  id: number;
  manager: Manager;
  consultant: Consultant;
  client: Client;
  clientEmployee: ClientEmployee;
  start_date: Date;
  end_date: Date;
}