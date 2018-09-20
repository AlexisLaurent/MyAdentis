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
  selector: 'meeting-add-form',
  templateUrl: 'meeting-add-form.component.html',
  styleUrls: ['meetings.component.css']
})

export class MeetingAddFormComponent implements OnInit {

  meeting = new Meeting();
  meetingForm: FormGroup;
  nextMeeting = new Meeting();
  nextMeetingForm: FormGroup;

  projectsListSubs: Subscription;
  projectsList: DetailedProject[];
  projectControl = new FormControl('');

  consultantForm: FormGroup;
  clientForm: FormGroup;
  clientEmployeeForm: FormGroup;
  projectDateForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private meetingsApi: MeetingsApiService,private projectsApi: ProjectsApiService, private atp: AmazingTimePickerService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {

    this.projectsListSubs = this.projectsApi
      .getDetailedProjects()
      .subscribe(res => {
          this.projectsList = res;
        },
        console.error
      );

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
      date: [this.meeting.date, Validators.required],
      time: [this.meeting.time, Validators.required],
      subject: [this.meeting.date, Validators.required],
      project_bilan1: [this.meeting.date, Validators.required],
      project_bilan2: [this.meeting.date, Validators.required],
      adentis_bilan1: [this.meeting.date, Validators.required],
      adentis_bilan2: [this.meeting.date, Validators.required],
      adentis_bilan3: [this.meeting.date, Validators.required],
      manager_signature: [this.meeting.date, Validators.required],
      consultant_signature: [this.meeting.date, Validators.required],
      client_signature: [this.meeting.date, Validators.required],
    });

    this.nextMeetingForm = this.formBuilder.group({
      date: [this.meeting.date, Validators.required],
      time: [this.meeting.time, Validators.required],
    });
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

    this.projectDateForm = this.formBuilder.group({
      start_date: new Date(project.start_date),
      end_date: new Date(project.end_date),
    });
  }

  current_date = new FormControl(new Date());

  managerControl = new FormControl('');
  managers = [
    {firstName: 'Tom', lastName: 'KIHY', email: 'tkihy@email.fr'},
  ];
  managersSelected = [];

  consultantControl = new FormControl('');
  consultants = [
    {firstName: 'Will', lastName: 'SMITH', email: 'wsmith@email.fr'},
    {firstName: 'Brad', lastName: 'PITT', email: 'bpitt@email.fr'},
    {firstName: 'Natalie', lastName: 'PORTMAN', email: 'nportman@email.fr'},
  ];
  consultantsSelected = [];

  clientControl = new FormControl('');
  clients = [
    {name: 'MIB', adresse: '12 rue des Pins', cp: '31000', city: 'TOULOUSE'},
    {name: 'Fight Club', adresse: '24 avenue des Fleurs', cp: '31120', city: 'ROQUES'},
  ];

  rpControl = new FormControl('');
  rps = [
    {firstName: 'Peter', lastName: 'CALE', email: 'pcale@email.fr', title: 'Manager', tel: '0661487598'},
    {firstName: 'Julie', lastName: 'MIRAN', email: 'jmiran@email.fr', title: 'Chef de Projet', tel: '0624587451'},
  ];
  rpsSelected = [];

  addManager(firstName,lastName,email,title,tel){
    let item = {firstName: firstName, lastName: lastName, email: email, title: title, tel: tel};
    this.managersSelected.push(item);
  }

  delManager(item){
    let index = this.managersSelected.indexOf(item);
    this.managersSelected.splice(index,1);
  }

  addConsultant(firstName,lastName,email,title,tel){
    let item = {firstName: firstName, lastName: lastName, email: email, title: title, tel: tel};
    this.consultantsSelected.push(item);
  }

  delConsultant(item){
    let index = this.consultantsSelected.indexOf(item);
    this.consultantsSelected.splice(index,1);
  }

  addRP(firstName,lastName,email,title,tel){
    let item = {firstName: firstName, lastName: lastName, email: email, title: title, tel: tel};
    this.rpsSelected.push(item);
  }

  delRP(item){
    let index = this.rpsSelected.indexOf(item);
    this.rpsSelected.splice(index,1);
  }

  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
    });
  }

  @ViewChild('manager_signaturePad') manager_signaturePad: SignaturePad;
  @ViewChild('consultant_signaturePad') consultant_signaturePad: SignaturePad;
  @ViewChild('client_signaturePad') client_signaturePad: SignaturePad;
 
  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 200,
    'canvasHeight': 120,
    'backgroundColor' : "grey",
  };

  ngAfterViewInit() {
    this.manager_signaturePad.set('minWidth', 5);
    this.manager_signaturePad.clear();

    this.consultant_signaturePad.set('minWidth', 5);
    this.consultant_signaturePad.clear();

    this.client_signaturePad.set('minWidth', 5);
    this.client_signaturePad.clear();
  }
 
  drawComplete() {
    this.meeting.manager_signature = this.manager_signaturePad.toDataURL();
    this.meeting.consultant_signature = this.consultant_signaturePad.toDataURL();
    this.meeting.client_signature = this.client_signaturePad.toDataURL();
  }

  saveMeeting(){
    this.meetingsApi
      .saveMeeting(this.meeting)
      .subscribe(
        () => this.router.navigate(['/meetings']),
        error => alert(error.message)
      );

    this.meetingsApi
      .saveMeeting(this.nextMeeting)
      .subscribe(
        () => this.router.navigate(['/meetings']),
        error => alert(error.message)
      );
  }
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