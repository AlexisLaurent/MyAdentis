import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';

import {ClientEmployeesApiService} from './clientEmployees/clientEmployees-api.service';
import {ClientsApiService} from './clients/clients-api.service';
import {ConsultantsApiService} from './consultants/consultants-api.service';
import {ManagersApiService} from './managers/managers-api.service';
import {MeetingsApiService} from './meetings/meetings-api.service';
import {ProjectsApiService} from './projects/projects-api.service';

import {MeetingsComponent} from './meetings/meetings.component';
import {MeetingAddFormComponent} from './meetings/meeting-add-form.component';
import {MeetingEditFormComponent} from './meetings/meeting-edit-form.component';
import {MeetingViewFormComponent} from './meetings/meeting-view-form.component';

import {ClientsComponent} from './clients/clients.component';
import {ClientAddFormComponent} from './clients/client-add-form.component';
import {ClientEditFormComponent} from './clients/client-edit-form.component';

import {ClientEmployeeAddFormComponent} from './clientEmployees/clientEmployee-add-form.component';
import {ClientEmployeeEditFormComponent} from './clientEmployees/clientEmployee-edit-form.component';

import {ManagersComponent} from './managers/managers.component';
import {ManagerAddFormComponent} from './managers/manager-add-form.component';
import {ManagerEditFormComponent} from './managers/manager-edit-form.component';

import {ConsultantsComponent} from './consultants/consultants.component';
import {ConsultantAddFormComponent} from './consultants/consultant-add-form.component';
import {ConsultantEditFormComponent} from './consultants/consultant-edit-form.component';

import {ProjectsComponent} from './projects/projects.component';
import {ProjectAddFormComponent} from './projects/project-add-form.component';
import {ProjectEditFormComponent} from './projects/project-edit-form.component';

import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule, MatButtonModule, MatCardModule} from '@angular/material';
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule} from "@angular/material";
import {MatStepperModule} from '@angular/material/stepper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {AmazingTimePickerModule} from 'amazing-time-picker';
import {SignaturePadModule} from 'angular2-signaturepad';
import {MatRadioModule} from '@angular/material/radio';

const appRoutes: Routes = [
  { path: '', component: MeetingsComponent },
  { path: 'meetings', component: MeetingsComponent },
  { path: 'new-meeting', component: MeetingAddFormComponent },
  { path: 'edit-meeting/:id', component: MeetingEditFormComponent },
  { path: 'view-meeting/:id', component: MeetingViewFormComponent },
  { path: 'consultants', component: ConsultantsComponent },
  { path: 'new-consultant/:id', component: ConsultantAddFormComponent },
  { path: 'edit-consultant/:id', component: ConsultantEditFormComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'new-client', component: ClientAddFormComponent },
  { path: 'edit-client/:id', component: ClientEditFormComponent },
  { path: 'new-clientEmployee/:id', component: ClientEmployeeAddFormComponent },
  { path: 'edit-clientEmployee/:id', component: ClientEmployeeEditFormComponent },
  { path: 'managers', component: ManagersComponent },
  { path: 'new-manager', component: ManagerAddFormComponent },
  { path: 'edit-manager/:id', component: ManagerEditFormComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'new-project', component: ProjectAddFormComponent },
  { path: 'edit-project/:id', component: ProjectEditFormComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MeetingsComponent,
    MeetingAddFormComponent,
    MeetingEditFormComponent,
    MeetingViewFormComponent,
    ConsultantsComponent,
    ConsultantAddFormComponent,
    ConsultantEditFormComponent,
    ClientsComponent,
    ClientAddFormComponent,
    ClientEditFormComponent,
    ClientEmployeeAddFormComponent,
    ClientEmployeeEditFormComponent,
    ManagersComponent,
    ManagerAddFormComponent,
    ManagerEditFormComponent,
    ProjectsComponent,
    ProjectAddFormComponent,
    ProjectEditFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    NoopAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatListModule,
    AmazingTimePickerModule,
    SignaturePadModule,
    MatRadioModule,
  ],
  providers: [ClientEmployeesApiService, ClientsApiService,
              ConsultantsApiService, ManagersApiService, MeetingsApiService,
              MeetingsApiService, ProjectsApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}