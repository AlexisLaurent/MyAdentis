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
  dataSource: MatTableDataSource<Manager>;

  constructor(private managersApi: ManagersApiService) { }

  ngOnInit() {
    this.managersListSubs = this.managersApi
      .getManagers()
      .subscribe(res => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.filterPredicate = function(data, filter: string): boolean {
            return data.firstName.toLowerCase().includes(filter) || data.lastName.toLowerCase().includes(filter);
          };
        },
        console.error
      );
  }

  ngOnDestroy() {
    this.managersListSubs.unsubscribe();
  }

  displayedColumns: string[] = ['firstName','lastName','email','tel','edit', 'delete'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteManager(id) {
    this.managersApi
      .deleteManager(id)
      .subscribe(res => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.filterPredicate = function(data, filter: string): boolean {
            return data.firstName.toLowerCase().includes(filter) || data.lastName.toLowerCase().includes(filter);
          };
        },
        console.error
      );
  }
}