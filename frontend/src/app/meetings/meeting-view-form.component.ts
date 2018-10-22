import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from 'rxjs';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {SignaturePad} from 'angular2-signaturepad/signature-pad';
import {Meeting} from './meeting.model';
import {MeetingsApiService} from './meetings-api.service';
import {Project} from '../projects/project.model';
import {ProjectsApiService} from '../projects/projects-api.service';
import {Manager} from '../managers/manager.model';
import {Consultant} from '../consultants/consultant.model';
import {ConsultantsApiService} from '../consultants/consultants-api.service';
import {Client} from '../clients/client.model';
import {ClientsApiService} from '../clients/clients-api.service';
import {ClientEmployee} from '../clientEmployees/clientEmployee.model';
import {ClientEmployeesApiService} from '../clientEmployees/clientEmployees-api.service';

@Component({
  selector: 'meeting-view-form',
  templateUrl: 'meeting-view-form.component.html',
  styleUrls: ['meetings.component.css']
})
export class MeetingViewFormComponent {
  meeting = new Meeting();
  detailedMeeting: DetailedMeeting;
  meetingsListSubs: Subscription;
  meetingForm: FormGroup;

  projectsListSubs: Subscription;
  projectsList: DetailedProject[];
  projectControl = new FormControl('');

  consultantForm: FormGroup;
  clientForm: FormGroup;
  clientEmployeeForm: FormGroup;
  projectDateForm: FormGroup;

  signaturePadOptions: Object = {
    'minWidth': 5,
    'canvasWidth': 200,
    'canvasHeight': 120,
    'backgroundColor' : "grey",
  };

  constructor(private formBuilder: FormBuilder,private meetingsApi: MeetingsApiService,private projectsApi: ProjectsApiService, private atp: AmazingTimePickerService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {

    let meetingId = parseInt(this.activatedRoute.snapshot.params["id"]);

    this.consultantForm = this.formBuilder.group({
      firstName: [{value: '', disabled: true}, Validators.required],
      lastName: [{value: '', disabled: true}, Validators.required],
      email: [{value: '', disabled: true}, Validators.required],
      tel: [{value: '', disabled: true}, Validators.required],
    });

    this.clientForm = this.formBuilder.group({
      name: [{value: '', disabled: true}, Validators.required],
      address: [{value: '', disabled: true}, Validators.required],
      cp: [{value: '', disabled: true}, Validators.required],
      city: [{value: '', disabled: true}, Validators.required],
    });

    this.clientEmployeeForm = this.formBuilder.group({
      firstName: [{value: '', disabled: true}, Validators.required],
      lastName: [{value: '', disabled: true}, Validators.required],
      email: [{value: '', disabled: true}, Validators.required],
      tel: [{value: '', disabled: true}, Validators.required],
      title: [{value: '', disabled: true}, Validators.required],
    });

    this.projectDateForm = this.formBuilder.group({
      start_date: [{value: '', disabled: true}, Validators.required],
      end_date: [{value: '', disabled: true}, Validators.required],
    });

    this.meetingForm = this.formBuilder.group({
      date: [{value: '', disabled: true}, Validators.required],
      time: [{value: '', disabled: true}, Validators.required],
      subject: [{value: '', disabled: true}, Validators.required],
      project_bilan1: [{value: '', disabled: true}, Validators.required],
      project_bilan2: [{value: '', disabled: true}, Validators.required],
      adentis_bilan1: [{value: '', disabled: true}, Validators.required],
      adentis_bilan2: [{value: '', disabled: true}, Validators.required],
      adentis_bilan3: [{value: '', disabled: true}, Validators.required],
    });

    this.meetingsListSubs = this.meetingsApi
      .getDetailedMeeting(meetingId)
      .subscribe(res => {
        this.detailedMeeting = res;
        this.meeting.project_id = this.detailedMeeting.project_id;
        this.meeting.manager_signature = this.detailedMeeting.manager_signature;
        this.meeting.consultant_signature = this.detailedMeeting.consultant_signature;
        this.meeting.client_signature = this.detailedMeeting.client_signature;
        this.consultantForm.setValue({
          firstName: this.detailedMeeting.consultant[0].firstName,
          lastName: this.detailedMeeting.consultant[0].lastName,
          email: this.detailedMeeting.consultant[0].email,
          tel: this.detailedMeeting.consultant[0].tel,
        });
        this.clientForm.setValue({
          name: this.detailedMeeting.client[0].name,
          address: this.detailedMeeting.client[0].address,
          cp: this.detailedMeeting.client[0].cp,
          city: this.detailedMeeting.client[0].city,
        });
        this.clientEmployeeForm.setValue({
          firstName: this.detailedMeeting.clientEmployee[0].firstName,
          lastName: this.detailedMeeting.clientEmployee[0].lastName,
          email: this.detailedMeeting.clientEmployee[0].email,
          tel: this.detailedMeeting.clientEmployee[0].tel,
          title: this.detailedMeeting.clientEmployee[0].title,
        });
        this.projectDateForm.setValue({
          start_date: new Date(this.detailedMeeting.start_date),
          end_date: new Date(this.detailedMeeting.end_date),
        });
        this.meetingForm.setValue({
          date: new Date(this.detailedMeeting.date),
          time: this.detailedMeeting.time,
          subject: this.detailedMeeting.subject,
          project_bilan1: this.detailedMeeting.project_bilan1,
          project_bilan2: this.detailedMeeting.project_bilan2,
          adentis_bilan1: this.detailedMeeting.adentis_bilan1,
          adentis_bilan2: this.detailedMeeting.adentis_bilan2,
          adentis_bilan3: this.detailedMeeting.adentis_bilan3,
        });
      },
        console.error
      );

    this.projectsListSubs = this.projectsApi
      .getDetailedProjects()
      .subscribe(res => {
          this.projectsList = res;
        },
        console.error
      );
  }

  current_date = new FormControl(new Date());

  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
    });
  }


  @ViewChild('consultant_signaturePad') consultant_signaturePad: SignaturePad;
  @ViewChild('client_signaturePad') client_signaturePad: SignaturePad;
  @ViewChild('manager_signaturePad') manager_signaturePad: SignaturePad;

  ngAfterViewInit() {
    this.manager_signaturePad.set('minWidth', 5);
    this.manager_signaturePad.clear();
    this.manager_signaturePad.fromDataURL(this.detailedMeeting.manager_signature);

    this.consultant_signaturePad.set('minWidth', 5);
    this.consultant_signaturePad.clear();
    this.consultant_signaturePad.fromDataURL(this.detailedMeeting.consultant_signature);

    this.client_signaturePad.set('minWidth', 5);
    this.client_signaturePad.clear();
    this.client_signaturePad.fromDataURL(this.detailedMeeting.client_signature);
  }
}

export class DetailedMeeting {
  id: number;
  project_id; number;
  consultant: Consultant;
  client: Client;
  clientEmployee: ClientEmployee;
  date: Date;
  time: string;
  subject: string;
  start_date: Date;
  end_date: Date;
  project_bilan1: string;
  project_bilan2: string;
  adentis_bilan1: string;
  adentis_bilan2: string;
  adentis_bilan3: string;
  manager_signature: string;
  consultant_signature: string;
  client_signature: string;
}

export class DetailedProject {
  id: number;
  manager: Manager;
  consultant: Consultant;
  client: Client;
  clientEmployee: ClientEmployee;
  start_date: Date;
  end_date: Date;
}