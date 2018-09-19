import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Project} from './project.model';
import {ProjectsApiService} from './projects-api.service';
import {Consultant} from '../consultants/consultant.model';
import {ConsultantsApiService} from '../consultants/consultants-api.service';
import {Client} from '../clients/client.model';
import {ClientsApiService} from '../clients/clients-api.service';
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

  project: Project;
  projectsListSubs: Subscription;
  projectForm: FormGroup;

  consultantsListSubs: Subscription;
  consultantsList: Consultant[];
  consultantControl = new FormControl('');

  clientsListSubs: Subscription;
  clientsList: Client[];
  clientControl = new FormControl('');

  constructor(private projectsApi: ProjectsApiService, private consultantsApi: ConsultantsApiService, private clientsApi: ClientsApiService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    let projectId = parseInt(this.activatedRoute.snapshot.params["id"]);

    this.projectForm = this.formBuilder.group({
      consultant_id: ['', Validators.required],
      client_id: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    });

    this.projectsListSubs = this.projectsApi
      .getProject(projectId)
      .subscribe(res => {
          this.project = res[0];
          this.projectForm.setValue({
            consultant_id: res[0].consultant_id,
            client_id: res[0].client_id,
            start_date: res[0].start_date,
            end_date: res[0].end_date,
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
  }

  updateProject() {
    this.project.consultant_id = this.projectForm.get('consultant_id').value;
    this.project.client_id = this.projectForm.get('client_id').value;
    this.project.start_date = this.projectForm.get('start_date').value;
    this.project.end_date = this.projectForm.get('end_date').value;

    this.projectsApi
      .updateProject(this.project)
      .subscribe(
        () => this.router.navigate(['/projects']),
        error => alert(error.message)
      );
  }

}