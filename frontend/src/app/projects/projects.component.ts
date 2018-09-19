import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {concatMap, tap} from 'rxjs/operators';
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

  project = new DetailedProject();
  dataList = new Array<DetailedProject>();
  dataSource: MatTableDataSource<DetailedProject>;

  constructor(private projectsApi: ProjectsApiService, private consultantsApi: ConsultantsApiService, private clientsApi: ClientsApiService) { }

  ngOnInit() {
    this.projectsListSubs = this.projectsApi
      .getDetailedProjects()
      .subscribe(res => {
          this.projectsList = res;
          this.dataSource = new MatTableDataSource(res);
        },
        console.error
      );
  }

  ngOnDestroy() {
    this.projectsListSubs.unsubscribe();
  }

  displayedColumns: string[] = ['consultant','client','start_date','end_date','edit','delete'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteProject(id) {
    this.projectsApi
      .deleteProject(id)
      .subscribe(
        err => console.log(err)
      );
  }
}

export class DetailedProject {
  id: number;
  manager: string;
  consultant: string;
  client: string;
  start_date: Date;
  end_date: Date;
}