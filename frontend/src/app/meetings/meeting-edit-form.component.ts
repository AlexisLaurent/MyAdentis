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
  selector: 'meeting-edit-form',
  templateUrl: 'meeting-edit-form.component.html',
  styleUrls: ['meetings.component.css']
})
export class MeetingEditFormComponent {
  meeting = new Meeting();
  detailedMeeting: DetailedMeeting;
  detailedProject: DetailedProject;
  meetingsListSubs: Subscription;
  meetingForm: FormGroup;

  nextMeeting = new Meeting();
  nextMeetingForm: FormGroup;

  projectsListSubs: Subscription;
  projectsList: DetailedProject[];

  consultantForm: FormGroup;
  clientForm: FormGroup;
  clientEmployeeForm: FormGroup;
  projectForm: FormGroup;

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

    this.projectForm = this.formBuilder.group({
      projectControl: ['', Validators.required],
      start_date: [{value: '', disabled: true}, Validators.required],
      end_date: [{value: '', disabled: true}, Validators.required],
    });

    this.meetingForm = this.formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      subject: ['', Validators.required],
      project_bilan1: [''],
      project_bilan2: [''],
      adentis_bilan1: [''],
      adentis_bilan2: [''],
      adentis_bilan3: [''],
    });

    this.nextMeetingForm = this.formBuilder.group({
      date: [this.nextMeeting.date],
      time: [this.nextMeeting.time],
      subject: [this.nextMeeting.subject],
    });

    this.meetingsListSubs = this.meetingsApi
      .getDetailedMeeting(meetingId)
      .subscribe(res => {
        this.detailedMeeting = res;
        this.detailedProject = this.detailedMeeting.detailedProject;
        this.meeting.project_id =  this.detailedProject.id;
        this.meeting.manager_signature = this.detailedMeeting.manager_signature;
        this.meeting.consultant_signature = this.detailedMeeting.consultant_signature;
        this.meeting.client_signature = this.detailedMeeting.client_signature;
        this.consultantForm.setValue({
          firstName: this.detailedProject.consultant[0].firstName,
          lastName: this.detailedProject.consultant[0].lastName,
          email: this.detailedProject.consultant[0].email,
          tel: this.detailedProject.consultant[0].tel,
        });
        this.clientForm.setValue({
          name: this.detailedProject.client[0].name,
          address: this.detailedProject.client[0].address,
          cp: this.detailedProject.client[0].cp,
          city: this.detailedProject.client[0].city,
        });
        this.clientEmployeeForm.setValue({
          firstName: this.detailedProject.clientEmployee[0].firstName,
          lastName: this.detailedProject.clientEmployee[0].lastName,
          email: this.detailedProject.clientEmployee[0].email,
          tel: this.detailedProject.clientEmployee[0].tel,
          title: this.detailedProject.clientEmployee[0].title,
        });
        this.projectForm.setValue({
          projectControl: this.detailedProject,
          start_date: new Date(this.detailedProject.start_date),
          end_date: new Date(this.detailedProject.end_date),
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

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }

  onProjectChanged(project) {
    this.meeting.project_id = project.id

    this.consultantForm.setValue({
      firstName: project.consultant[0].firstName,
      lastName: project.consultant[0].lastName,
      email: project.consultant[0].email,
      tel: project.consultant[0].tel,
    });

    this.clientForm.setValue({
      name: project.client[0].name,
      address: project.client[0].address,
      cp: project.client[0].cp,
      city: project.client[0].city,
    });

    this.clientEmployeeForm.setValue({
      firstName: project.clientEmployee[0].firstName,
      lastName: project.clientEmployee[0].lastName,
      email: project.clientEmployee[0].email,
      tel: project.clientEmployee[0].tel,
      title: project.clientEmployee[0].title,
    });

    this.projectForm = this.formBuilder.group({
      projectControl: project,
      start_date: new Date(project.start_date),
      end_date: new Date(project.end_date),
    });
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

  loadSignaturePad() {
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
 
  drawComplete() {
    this.meeting.manager_signature = this.manager_signaturePad.toDataURL();
    this.meeting.consultant_signature = this.consultant_signaturePad.toDataURL();
    this.meeting.client_signature = this.client_signaturePad.toDataURL();
  }

  updateMeeting() {
    this.meeting.id = this.detailedMeeting.id;
    this.meeting.date = this.meetingForm.get('date').value;
    this.meeting.time = this.meetingForm.get('time').value;
    this.meeting.subject = this.meetingForm.get('subject').value;
    
    if(this.meeting.subject == "PAP"){
      this.meeting.project_bilan1 = this.meetingForm.get('project_bilan1').value;
      this.meeting.project_bilan2 = this.meetingForm.get('project_bilan2').value;
      this.meeting.adentis_bilan1 = this.meetingForm.get('adentis_bilan1').value;
      this.meeting.adentis_bilan2 = this.meetingForm.get('adentis_bilan2').value;
      this.meeting.adentis_bilan3 = this.meetingForm.get('adentis_bilan3').value;
    }

    this.meetingsApi
      .updateMeeting(this.meeting)
      .subscribe(
        () => this.router.navigate(['/meetings']),
        error => alert(error.message)
      );

    if (this.meeting.subject == "PAP" && this.nextMeeting.subject != "" && this.nextMeeting.subject != undefined){
      this.nextMeeting.project_id = this.meeting.project_id;
      this.meetingsApi
      .saveMeeting(this.nextMeeting)
      .subscribe(
        () => this.router.navigate(['/meetings']),
        error => alert(error.message)
      );
    }
  }
}

export class DetailedMeeting {
  id: number;
  detailedProject: DetailedProject;
  date: Date;
  time: string;
  subject: string;
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