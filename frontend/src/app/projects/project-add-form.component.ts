import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";
import {Subscription} from 'rxjs';
import {Project} from './project.model';
import {ProjectsApiService} from './projects-api.service';
import {Consultant} from '../consultants/consultant.model';
import {ConsultantsApiService} from '../consultants/consultants-api.service';
import {Client} from '../clients/client.model';
import {ClientsApiService} from '../clients/clients-api.service';
import {ClientEmployee} from '../clientEmployees/clientEmployee.model';
import {ClientEmployeesApiService} from '../clientEmployees/clientEmployees-api.service';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'project-add-form',
  templateUrl: 'project-add-form.component.html',
  styleUrls: ['projects.component.css']
})

export class ProjectAddFormComponent {
  project = new Project();
  projectForm: FormGroup;

  consultantsListSubs: Subscription;
  consultantsList: Consultant[];

  clientsListSubs: Subscription;
  clientsList: Client[];

  clientEmployeesListSubs: Subscription;
  clientEmployeesList: ClientEmployee[];

  date = new FormControl(new Date());

  constructor(private projectsApi: ProjectsApiService, private consultantsApi: ConsultantsApiService, private clientsApi: ClientsApiService, private clientEmployeesApi: ClientEmployeesApiService, private formBuilder: FormBuilder, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.project.start_date = new Date();
    this.project.end_date = new Date();

    this.projectForm = this.formBuilder.group({
      'consultantControl': ['',Validators.required],
      'clientControl': ['',Validators.required],
      'clientEmployeeControl': ['',Validators.required],
      'start_date': [this.project.start_date, [Validators.required]],
      'end_date': [this.project.end_date, [Validators.required]],
    });

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

  saveProject() {
    if(this.project.start_date < this.project.end_date){
      this.project.manager_id = 1;
      this.project.consultant_id = this.projectForm.get('consultantControl').value.id;
      this.project.client_id = this.projectForm.get('clientControl').value.id;
      this.project.clientEmployee_id = this.projectForm.get('clientEmployeeControl').value.id;
      this.projectsApi
        .saveProject(this.project)
        .subscribe(
          () => this.router.navigate(['/projects']),
          error => alert(error.message)
        );
    } else {
      this.snackBar.open("La date de début de commande doit être antérieure à la date de fin.", "Fermer");
    }
  }
}