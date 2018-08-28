import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {mergeMap} from 'rxjs/add/operator';
import {Project} from './project.model';
import {ProjectsApiService} from './projects-api.service';
import {Consultant} from '../consultants/consultant.model';
import {ConsultantsApiService} from '../consultants/consultants-api.service';
import {Client} from '../clients/client.model';
import {ClientsApiService} from '../clients/clients-api.service';

@Component({
  selector: 'projects',
  templateUrl: 'projects.component.html',
  styleUrls: ['projects.component.css'],
})

export class ProjectsComponent {
  projectsListSubs: Subscription;
  projectsList: Project[];
  dataSource: MatTableDataSource<Test>;
  dataList: Test[];
  consultantSubs: Subscription;
  clientSubs: Subscription;
  project : Test;

  constructor(private projectsApi: ProjectsApiService, private consultantsApi: ConsultantsApiService, private clientsApi: ClientsApiService) { }

  ngOnInit() {
    /*this.projectsListSubs = this.projectsApi
      .getProjects()
      .flatMap(params => {
          params.forEach(elem => {
          this.project.start_date = elem.start_date;
          this.project.end_date = elem.end_date;
          return  [this.consultantsApi.getConsultant(elem.consultant_id),this.clientsApi.getClient(elem.client_id)]
        }
        this.dataSource = new MatTableDataSource(this.dataList);
      })
      .subscribe(params => {
        this.project.consultant = params[0].firstName + " " + params[0].lastName;
        this.project.client = params[1].name;
        this.dataList.push(this.project);
      });*/
  }

  ngOnDestroy() {
    //this.projectsListSubs.unsubscribe();
  }

  displayedColumns: string[] = ['consultant','client','start_date','end_date'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


export interface Test {
  consultant: String,
  client: String,
  start_date: Date,
  end_date: Date,
}