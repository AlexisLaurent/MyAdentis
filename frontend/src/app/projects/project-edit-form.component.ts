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
import {Subscription} from 'rxjs';
import {concatMap, tap} from 'rxjs/operators';
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
  consultantControl = new FormControl('');
  consultantForm: FormGroup;

  client: Client;
  clientsListSubs: Subscription;
  clientsList: Client[];
  clientControl = new FormControl('');
  clientForm: FormGroup;

  clientEmployee: ClientEmployee;
  clientEmployeesListSubs: Subscription;
  clientEmployeesList: ClientEmployee[];
  clientEmployeeControl = new FormControl('');
  clientEmployeeForm: FormGroup;

  constructor(private projectsApi: ProjectsApiService, private consultantsApi: ConsultantsApiService, private clientsApi: ClientsApiService, private clientEmployeesApi: ClientEmployeesApiService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.projectId = parseInt(this.activatedRoute.snapshot.params["id"]);

    this.projectForm = this.formBuilder.group({
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

    this.projectsListSubs = this.projectsApi
      .getDetailedProject(this.projectId)
      .subscribe(res => {
          this.manager = res.manager[0];
          this.consultant = res.consultant[0];
          this.client = res.client[0];
          this.clientEmployee = res.clientEmployee[0];

          this.projectForm.setValue({
            start_date: new Date(res.start_date),
            end_date: new Date(res.end_date),
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

    this.consultantsListSubs = this.consultantsApi
      .getConsultants()
      .subscribe(res => {
          this.consultantsList = res;
        },
        console.error
      );

    this.clientsListSubs = this.clientsApi
      .getClients()
      .subscribe(res => {
          this.clientsList = res;
        },
        console.error
      );

    this.clientsListSubs = this.clientsApi
      .getClients()
      .subscribe(res => {
          this.clientsList = res;
        },
        console.error
      );
  }

  updateProject() {
    this.project.id = this.projectId;
    this.project.manager_id = this.manager.id;
    this.project.consultant_id = this.consultantControl.value.id === undefined ? this.consultant.id : this.consultantControl.value.id;
    this.project.client_id = this.clientControl.value.id === undefined ? this.client.id : this.clientControl.value.id;
    this.project.clientEmployee_id = this.clientEmployeeControl.value.id === undefined ? this.clientEmployee.id : this.clientEmployeeControl.value.id;
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