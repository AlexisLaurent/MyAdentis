import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";
import {AmazingTimePickerService} from 'amazing-time-picker';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'meeting-add-form',
  templateUrl: 'meeting-add-form.component.html',
  styleUrls: ['meetings.component.css']
})

export class MeetingAddFormComponent {
  commande: FormGroup;
  typeMeeting: FormGroup;
  bilanProjet: FormGroup;
  bilanAdentis: FormGroup;
  nextMeeting: FormGroup;
  signature: FormGroup;

  constructor(private _formBuilder: FormBuilder, private atp: AmazingTimePickerService) {}

  ngOnInit() {
    this.commande = this._formBuilder.group({
      commandeCtrl: ['', Validators.required]
    });
    this.typeMeeting = this._formBuilder.group({
      typeMeetingCtrl: ['', Validators.required]
    });
    this.bilanProjet = this._formBuilder.group({
      bilanProjetCtrl: ['', Validators.required]
    });
    this.bilanAdentis = this._formBuilder.group({
      bilanAdentisCtrl: ['', Validators.required]
    });
    this.nextMeeting = this._formBuilder.group({
      nextMeetingCtrl: ['', Validators.required]
    });
    this.signature = this._formBuilder.group({
      signatureCtrl: ['', Validators.required]
    });
  }

  date = new FormControl(new Date());


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

  @ViewChild(SignaturePad) signaturePad: SignaturePad;
 
  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 200,
    'canvasHeight': 120
  };

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }
 
  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
  }
 
  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }
}