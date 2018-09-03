import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {Manager} from './manager.model';
import {ManagersApiService} from './managers-api.service';

@Component({
  selector: 'managers',
  templateUrl: 'managers.component.html',
  styleUrls: ['managers.component.css'],
})

export class ManagersComponent {
  managersListSubs: Subscription;
  managersList: Manager[];
  dataSource: MatTableDataSource<Manager>;

  constructor(private managersApi: ManagersApiService) { }

  ngOnInit() {
    this.managersListSubs = this.managersApi
      .getManagers()
      .subscribe(res => {
          this.managersList = res;
          this.dataSource = new MatTableDataSource(res);
        },
        console.error
      );
  }

  ngOnDestroy() {
    this.managersListSubs.unsubscribe();
  }

  displayedColumns: string[] = ['firstName','lastName','email','tel','edit'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}