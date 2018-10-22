import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {concatMap, tap} from 'rxjs/operators';
import {Meeting} from './meeting.model';
import {MeetingsApiService} from './meetings-api.service';
import {Manager} from '../managers/manager.model';

@Component({
  selector: 'meetings',
  templateUrl: 'meetings.component.html',
  styleUrls: ['meetings.component.css'],
})

export class MeetingsComponent {
  meetingsListSubs: Subscription;
  meetingsList: SimplifiedMeeting[];

  meeting = new SimplifiedMeeting();
  dataList = new Array<SimplifiedMeeting>();
  dataSource: MatTableDataSource<SimplifiedMeeting>;

  constructor(private meetingsApi: MeetingsApiService) { }

  ngOnInit() {
    this.meetingsListSubs = this.meetingsApi
      .getSimplifiedMeetings()
      .subscribe(res => {
          this.meetingsList = res;
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.filterPredicate = function(data, filter: string): boolean {
            return data.subject.toLowerCase().includes(filter) || data.consultant.toLowerCase().includes(filter);
          };
        },
        console.error
      );
  }

  ngOnDestroy() {
    this.meetingsListSubs.unsubscribe();
  }

  displayedColumns: string[] = ['date','time','subject','consultant', 'edit', 'delete', 'view'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteMeeting(id) {
    this.meetingsApi
      .deleteMeeting(id)
      .subscribe(
        err => console.log(err)
      );
  }
}

export class SimplifiedMeeting {
  id: number;
  date: Date;
  time: string;
  subject: string;
  consultant: string;
}