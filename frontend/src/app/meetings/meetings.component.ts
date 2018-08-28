import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';

export interface MeetingElement {
  date: string;
  type: string;
  consultant: string;
  client: string;
}

const ELEMENT_DATA: MeetingElement[] = [
  {date: '30/07/2018', type: 'Kick-off'     , consultant: "Will SMITH", client: 'MIB'},
  {date: '06/08/2018', type: 'PAP'          , consultant: "Brad PITT" , client: 'Fight Club'},
  {date: '24/08/2018', type: 'PAP'          , consultant: "Will SMITH", client: 'MIB'},
  {date: '31/08/2018', type: 'Bilan mission', consultant: "Brad PITT" , client: 'Fight Club'},
];

@Component({
  selector: 'meetings',
  template: `
    <h2>Mes Réunions</h2>
    <div class="meetings">

      <mat-form-field>
        <input matInput (keyup)="applyFilter($event.target.value)" placeholder="Filter">
      </mat-form-field>

      <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef> Date </th>
          <td mat-cell *matCellDef="let element"> {{element.date}} </td>
        </ng-container>

        <ng-container matColumnDef="type">
          <th mat-header-cell *matHeaderCellDef> Type </th>
          <td mat-cell *matCellDef="let element"> {{element.type}} </td>
        </ng-container>

        <ng-container matColumnDef="consultant">
          <th mat-header-cell *matHeaderCellDef> Consultant </th>
          <td mat-cell *matCellDef="let element"> {{element.consultant}} </td>
        </ng-container>

        <!--<ng-container matColumnDef="client">
          <th mat-header-cell *matHeaderCellDef> Client </th>
          <td mat-cell *matCellDef="let element"> {{element.client}} </td>
        </ng-container>-->

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;" (click)="selectRow(row)"></tr>
      </table>

    </div>
    <button mat-fab color="primary" class="new-meeting" routerLink="/new-meeting">
      <i class="material-icons">add</i>
    </button>
  `,
  styleUrls: ['meetings.component.css'],
})

export class MeetingsComponent {
  displayedColumns: string[] = ['date', 'type', 'consultant']; //, 'client'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}