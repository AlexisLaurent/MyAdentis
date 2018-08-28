import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'meeting-edit-form',
  template: `
    <div>
      <h2>Modifier Réunion</h2>

      <table>    
        <tr>    
          <td>
            <mat-form-field>
              <input matInput [matDatepicker]="picker" placeholder="Choissiez une date">
              <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>
          </td>
        </tr>
        <tr>  
          <td>    
            <mat-form-field>
              <mat-select [(value)]="selectedType">
                <mat-option value="kickOff">Kick Off</mat-option>
                <mat-option value="PAP">PAP</mat-option>
                <mat-option value="BilanMission">Bilan de mission</mat-option>
              </mat-select>
            </mat-form-field>
          </td>
        </tr>
        <tr>  
          <td>    
            <mat-form-field>
              <mat-select placeholder="Client" [(value)]="selectedClient">
                <mat-option *ngFor="let client of clients" [value]="client.name">
                  {{client.name}}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </td> 
          <td> 
            <mat-form-field>
              <mat-select placeholder="Responsable Projet" [(value)]="selectedRP">
                <mat-option *ngFor="let rp of rps" [value]="rp.name">
                  {{rp.name}}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </td>
        </tr>
        <tr>  
          <td>    
            <mat-form-field>
              <mat-select placeholder="Consultant" [(value)]="selectedConsultant">
                <mat-option *ngFor="let consultant of consultants" [value]="consultant.name">
                  {{consultant.name}}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </td>
        </tr>
        <tr>  
          <td>    
            <mat-form-field>
              <textarea matInput placeholder="Bilan Projet"></textarea>
            </mat-form-field>
          </td>
        </tr>
      </table>
      <button mat-raised-button color="primary">Sauvegarder</button>
    </div>
  `
})
export class MeetingEditFormComponent {
  selectedType = 'PAP';
  selectedClient = 'MIB';
  selectedRP = 'Antoine BOROT'
  selectedConsultant = 'Will SMITH'

  clients = [
    {name: 'MIB'},
    {name: 'Fight Club'}  
  ];

  rps = [
    {name: 'Antoine BOROT'},
    {name: 'Julie FERA'}  
  ];

  consultants = [
    {name: 'Will SMITH'},
    {name: 'Brad PITT'},
    {name: 'Natalie PORTMAN'}
  ];
}