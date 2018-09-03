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
  consultantsList: Consultant[];
  dataSource: MatTableDataSource<Consultant>;

  constructor(private consultantsApi: ConsultantsApiService) { }

  ngOnInit() {
    this.consultantsListSubs = this.consultantsApi
      .getConsultants()
      .subscribe(res => {
          this.consultantsList = res;
          this.dataSource = new MatTableDataSource(res);
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
      .subscribe(
        err => console.log(err)
      );
  }
}