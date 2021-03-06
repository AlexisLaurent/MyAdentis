import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {Consultant} from './consultant.model';
import {ConsultantsApiService} from './consultants-api.service';

@Component({
  selector: 'consultants',
  templateUrl: 'consultants.component.html',
  styleUrls: ['consultants.component.css'],
})

export class ConsultantsComponent {
  consultantsListSubs: Subscription;
  dataSource: MatTableDataSource<Consultant>;

  constructor(private consultantsApi: ConsultantsApiService) { }

  ngOnInit() {
    this.consultantsListSubs = this.consultantsApi
      .getConsultants()
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
    this.consultantsListSubs.unsubscribe();
  }

  displayedColumns: string[] = ['firstName','lastName','email','tel','edit','delete'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteConsultant(id) {
    this.consultantsApi
      .deleteConsultant(id)
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