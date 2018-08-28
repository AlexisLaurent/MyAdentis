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
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';

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
  consultantControl = new FormControl('');

  clientsListSubs: Subscription;
  clientsList: Client[];
  clientControl = new FormControl('');

  date = new FormControl(new Date());

  constructor(private projectsApi: ProjectsApiService, private consultantsApi: ConsultantsApiService, private clientsApi: ClientsApiService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
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

    this.projectForm = this.formBuilder.group({
      'consultant_id': [this.project.consultant_id, [Validators.required]],
      'client_id': [this.project.client_id, [Validators.required]],
      'start_date': [this.project.start_date, [Validators.required]],
      'end_date': [this.project.end_date, [Validators.required]],
    });
  }

  saveProject() {
    this.project.manager_id = 1;
    this.projectsApi
      .saveProject(this.project)
      .subscribe(
        () => this.router.navigate(['/projects']),
        error => alert(error.message)
      );
  }
}