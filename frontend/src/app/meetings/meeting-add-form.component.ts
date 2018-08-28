import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";
import {AmazingTimePickerService} from 'amazing-time-picker';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'meeting-add-form',
  template: `
    <div>
      <h2>Nouvelle Réunion</h2>

      <mat-horizontal-stepper [linear]="false" #stepper>
        <mat-step [stepControl]="commande">
          <form [formGroup]="commande">
            <h3>Adentis</h3>
            <table>
              <tr>
                <h4>Manager</h4>
              </tr>
              <tr>
                <td>
                  <mat-form-field>
                    <input matInput placeholder="Nom" value="AGER" disabled>
                  </mat-form-field>
                </td>
                <td>
                  <mat-form-field>
                    <input matInput placeholder="Prénom" value="MAN" disabled>
                  </mat-form-field>
                </td>
                <td>
                  <mat-form-field>
                    <input matInput placeholder="Email" value="manager@email.fr" disabled>
                  </mat-form-field>
                </td>
              </tr>
              <tr>
                <h4>Consultant</h4>
              </tr>
              <tr>
                <td>
                  <mat-form-field>
                    <mat-select placeholder="Mes Consultants" [formControl]="consultantControl">
                      <mat-option value="Nouveau Consultant">Nouveau Consultant</mat-option>
                      <mat-option *ngFor="let consultant of consultants" [value]="consultant">
                        {{consultant.lastName}} {{consultant.firstName}}
                      </mat-option>
                    </mat-select>
                  </mat-form-field>
                </td>
              </tr>
              <tr>
                <td>
                  <mat-form-field>
                    <input matInput placeholder="Nom" value="{{consultantControl.value?.lastName}}" >
                  </mat-form-field>
                </td>
                <td>
                  <mat-form-field>
                    <input matInput placeholder="Prénom" value="{{consultantControl.value?.firstName}}" >
                  </mat-form-field>
                </td>
                <td>
                  <mat-form-field>
                    <input matInput placeholder="Email" value="{{consultantControl.value?.email}}" >
                  </mat-form-field>
                </td>
              </tr>
            </table>
            <h3>Client</h3>
            <table>
              <tr>
                <h4>Société</h4>
              </tr>
              <tr>
                <td>
                  <mat-form-field>
                    <mat-select placeholder="Mes Clients" [formControl]="clientControl">
                      <mat-option>Nouveau Client</mat-option>
                      <mat-option *ngFor="let client of clients" [value]="client">
                        {{client.name}}, {{client.adresse}} - {{client.city}}
                      </mat-option>
                    </mat-select>
                  </mat-form-field>
                </td>
              </tr>
              <tr>
                <td>
                  <mat-form-field>
                    <input matInput placeholder="Nom" value="{{clientControl.value?.name}}">
                  </mat-form-field>
                </td>
              </tr>
              <tr>
                <td>
                  <mat-form-field>
                    <input matInput placeholder="Adresse" value="{{clientControl.value?.adresse}}">
                  </mat-form-field>
                </td>
                <td>
                  <mat-form-field>
                    <input matInput placeholder="Code Postal" value="{{clientControl.value?.cp}}">  
                  </mat-form-field>
                </td>
                <td>
                  <mat-form-field>
                    <input matInput placeholder="Ville" value="{{clientControl.value?.city}}">
                  </mat-form-field>
                </td>
              </tr>
              <tr>
                <h4>Responsable Projet</h4>
              </tr>
              <tr>
                <td>
                  <mat-form-field>
                    <mat-select placeholder="Responsable projet" [formControl]="rpControl">
                      <mat-option>Nouveau Responsable projet</mat-option>
                      <mat-option *ngFor="let rp of rps" [value]="rp">
                        {{rp.lastName}} {{rp.firstName}} - {{rp.title}}
                      </mat-option>
                    </mat-select>
                  </mat-form-field>
                </td>
              </tr>
              <tr>
                <td>
                  <mat-form-field>
                    <input matInput #firstNameRP placeholder="Nom" value="{{rpControl.value?.lastName}}" >
                  </mat-form-field>
                </td>
                <td>
                  <mat-form-field>
                    <input matInput #lastNameRP placeholder="Prénom" value="{{rpControl.value?.firstName}}" >
                  </mat-form-field>
                </td>
                <td>
                  <mat-form-field>
                    <input matInput #titleRP placeholder="Poste" value="{{rpControl.value?.title}}" >
                  </mat-form-field>
                </td>
              </tr>
              <tr>
                <td>
                  <mat-form-field>
                    <input matInput #emailRP placeholder="Email" value="{{rpControl.value?.email}}" >
                  </mat-form-field>
                </td>
                <td>
                  <mat-form-field>
                    <input matInput #telRP placeholder="Téléphone" value="{{rpControl.value?.tel}}" >
                  </mat-form-field>
                </td>
              </tr>
              <tr>
                <td>
                  <button mat-button (click)="addRP(firstNameRP.value,lastNameRP.value,emailRP.value,titleRP.value,telRP.value)" color="primary">Ajouter</button>
                </td>
              </tr>
              <tr>
                <td>
                  <mat-list-item *ngFor="let rp of rpsSelected">
                    <h4 mat-line>{{rp.lastName}} {{rp.firstName}} - {{rp.title}} | <button (click)="delRP(rp)">Delete</button></h4>
                  </mat-list-item>
                </td>
              </tr>
            </table>
            <h3>Date Commande</h3>
            <table>
              <tr>
                <h4>Début</h4>
              </tr>
              <tr>
                <td>
                  <mat-form-field>
                    <input matInput [matDatepicker]="deb" placeholder="Choissiez une date" [value]="date.value" >
                    <mat-datepicker-toggle matSuffix [for]="deb"></mat-datepicker-toggle>
                    <mat-datepicker #deb></mat-datepicker>
                  </mat-form-field>
                </td>
              </tr>
              <tr>
                <h4>Fin</h4>
              </tr>
              <tr>
                <td>
                  <mat-form-field>
                    <input matInput [matDatepicker]="end" placeholder="Choissiez une date" [value]="date.value">
                    <mat-datepicker-toggle matSuffix [for]="end"></mat-datepicker-toggle>
                    <mat-datepicker #end></mat-datepicker>
                  </mat-form-field>
                </td>
              </tr>
            </table>
            <div>
              <button mat-raised-button color="primary" matStepperNext>Next</button>
            </div>
          </form>
        </mat-step>
        <mat-step [stepControl]="typeMeeting">
          <form [formGroup]="typeMeeting">
            <ng-template matStepLabel></ng-template>
            <table>
              <tr>
                <td>
                  <h4>Date de la réunion</h4>
                </td>
              </tr>
              <tr>
                <td>
                  <mat-form-field>
                    <input matInput [matDatepicker]="dateReu" placeholder="Choissiez une date" [value]="date.value" >
                    <mat-datepicker-toggle matSuffix [for]="dateReu"></mat-datepicker-toggle>
                    <mat-datepicker #dateReu></mat-datepicker>
                  </mat-form-field>
                </td>
                <td>
                  <input type="time" atp-time-picker value="20:55"/>
                </td>
              </tr>
              <tr>
                <td>
                  <h3>Ordre du jour</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <mat-form-field>
                    <mat-select [(value)]="selected">
                      <mat-option value="kickOff">Kick Off</mat-option>
                      <mat-option value="PAP">PAP</mat-option>
                      <mat-option value="BilanMission">Bilan de mission</mat-option>
                    </mat-select>
                  </mat-form-field>
                </td>
              </tr>
            </table>
            <div>
              <button mat-raised-button color="primary" matStepperPrevious>Précédent</button>
              <button mat-raised-button color="primary" matStepperNext>Suivant</button>
            </div>
          </form>
        </mat-step>
        <mat-step [stepControl]="bilanProjet">
          <form [formGroup]="bilanProjet">
            <ng-template matStepLabel></ng-template>
            <h3>Bilan Projet</h3>
            <mat-form-field>
              <textarea matInput placeholder="Décrivez le bilan du projet à ce jour"></textarea>
            </mat-form-field>
            <div>
              <button mat-raised-button color="primary" matStepperPrevious>Précédent</button>
              <button mat-raised-button color="primary" matStepperNext>Suivant</button>
            </div>
          </form>
        </mat-step>
        <mat-step [stepControl]="bilanAdentis">
          <form [formGroup]="bilanAdentis">
            <ng-template matStepLabel></ng-template>
            <h3>Bilan Adentis</h3>
            <section class="example-section">
              <mat-checkbox class="example-margin" >Communication</mat-checkbox>
              <mat-checkbox class="example-margin" >Développement</mat-checkbox>
            </section>
            <mat-form-field>
              <textarea matInput placeholder="Décrivez le bilan d'Adentis" ></textarea>
            </mat-form-field>
            <div>
              <button mat-raised-button color="primary" matStepperPrevious>Précédent</button>
              <button mat-raised-button color="primary" matStepperNext>Suivant</button>
            </div>
          </form>
        </mat-step>
         <mat-step [stepControl]="nextMeeting">
          <form [formGroup]="nextMeeting">
            <ng-template matStepLabel></ng-template>
            <h3>Prochaine Réunion</h3>
              <mat-form-field>
                <input matInput [matDatepicker]="next" placeholder="Choissiez une date" [value]="date.value" >
                <mat-datepicker-toggle matSuffix [for]="next"></mat-datepicker-toggle>
                <mat-datepicker #next></mat-datepicker>
              </mat-form-field>
              <input type="time" atp-time-picker value="20:55"/>
              <table>
              <tr>
                <h4>Manager</h4>
              </tr>
              <tr>
                <td>
                  <mat-form-field>
                    <mat-select placeholder="Manager" [formControl]="managerControl">
                      <mat-option *ngFor="let manager of managers" [value]="manager">
                        {{manager.lastName}} {{manager.firstName}}
                      </mat-option>
                    </mat-select>
                  </mat-form-field>
                </td>
              </tr>
              <tr>
                <td>
                  <mat-form-field>
                    <input matInput #lastNameManager placeholder="Nom" value={{managerControl.value?.lastName}} >
                  </mat-form-field>
                </td>
                <td>
                  <mat-form-field>
                    <input matInput #firstNameManager placeholder="Prénom" value={{managerControl.value?.firstName}} >
                  </mat-form-field>
                </td>
                <td>
                  <mat-form-field>
                    <input matInput #emailManager placeholder="Email" value={{managerControl.value?.email}}>
                  </mat-form-field>
                </td>
              </tr>
              <tr>
                <td>
                  <mat-list-item *ngFor="let m of managersSelected">
                    <h4 mat-line>{{m.lastName}} {{m.firstName}} | <button (click)="delManager(m)">Delete</button></h4>
                  </mat-list-item>
                </td>
              </tr>
              <tr>
                <td>
                  <button mat-button (click)="addManager(lastNameManager.value,firstNameManager.value)" color="primary">Ajouter</button>
                </td>
              </tr>
              <tr>
                <h4>Consultant</h4>
              </tr>
              <tr>
                <td>
                  <mat-form-field>
                    <mat-select placeholder="Consultant" [formControl]="consultantControl">
                      <mat-option *ngFor="let consultant of consultants" [value]="consultant">
                        {{consultant.lastName}} {{consultant.firstName}}
                      </mat-option>
                    </mat-select>
                  </mat-form-field>
                </td>
              </tr>
              <tr>
                <td>
                  <mat-form-field>
                    <input matInput #lastNameConsultant placeholder="Nom" value={{consultantControl.value?.firstName}} >
                  </mat-form-field>
                </td>
                <td>
                  <mat-form-field>
                    <input matInput #firstNameConsultant placeholder="Prénom" value={{consultantControl.value?.lastName}} >
                  </mat-form-field>
                </td>
                <td>
                  <mat-form-field>
                    <input matInput #emailConsultant placeholder="Email" value={{consultantControl.value?.email}}>
                  </mat-form-field>
                </td>
              </tr>
              <tr>
                <td>
                  <mat-list-item *ngFor="let c of consultantsSelected">
                    <h4 mat-line>{{c.lastName}} {{c.firstName}} | <button (click)="delConsultant(c)">Delete</button></h4>
                  </mat-list-item>
                </td>
              </tr>
              <tr>
                <td>
                  <button mat-button (click)="addConsultant(lastNameConsultant.value,firstNameConsultant.value)" color="primary">Ajouter</button>
                </td>
              </tr>
              <tr>
                <h4>Responsable Projet</h4>
              </tr>
              <tr>
                <td>
                  <mat-form-field>
                    <mat-select placeholder="Responsable Projet" [formControl]="rpControl">
                      <mat-option *ngFor="let rp of rps" [value]="rp">
                        {{rp.lastName}} {{rp.firstName}}
                      </mat-option>
                    </mat-select>
                  </mat-form-field>
                </td>
              </tr>
              <tr>
                <td>
                  <mat-form-field>
                    <input matInput #lastNameRP placeholder="Nom" value={{rpControl.value?.lastName}} >
                  </mat-form-field>
                </td>
                <td>
                  <mat-form-field>
                    <input matInput #firstNameRP placeholder="Prénom" value={{rpControl.value?.firstName}} >
                  </mat-form-field>
                </td>
                <td>
                  <mat-form-field>
                    <input matInput #emailRP placeholder="Email" value={{rpControl.value?.email}}>
                  </mat-form-field>
                </td>
              </tr>
              <tr>
                <td>
                  <mat-list-item *ngFor="let rp of rpsSelected">
                    <h4 mat-line>{{rp.lastName}} {{rp.firstName}} | <button (click)="delRP(rp)">Delete</button></h4>
                  </mat-list-item>
                </td>
              </tr>
              <tr>
                <td>
                  <button mat-button (click)="addRP(lastNameRP.value,firstNameRP.value)" color="primary">Ajouter</button>
                </td>
              </tr>
            </table>
            <div>
              <button mat-raised-button color="primary" matStepperPrevious>Précédent</button>
              <button mat-raised-button color="primary" matStepperNext>Suivant</button>
            </div>
          </form>
        </mat-step>
        <mat-step [stepControl]="signature">
          <form [formGroup]="signature">
            <ng-template matStepLabel></ng-template>
            <h3>Signatures</h3>
            <table>
              <tr>
                <h4>Manager</h4>
              </tr>
              <tr>
                <signature-pad [options]="signaturePadOptions" (onBeginEvent)="drawStart()" (onEndEvent)="drawComplete()"></signature-pad>
              </tr>
              <tr>
                <h4>Consultant</h4>
              </tr>
              <tr>
                <signature-pad [options]="signaturePadOptions" (onBeginEvent)="drawStart()" (onEndEvent)="drawComplete()"></signature-pad>
              </tr>
              <tr>
                <h4>Client</h4>
              </tr>
              <tr>
                <signature-pad [options]="signaturePadOptions" (onBeginEvent)="drawStart()" (onEndEvent)="drawComplete()"></signature-pad>
              </tr>
            </table>
            <div>
              <button mat-raised-button color="primary" matStepperPrevious>Précédent</button>
              <button mat-raised-button color="primary">Sauvegarder</button>
            </div>
          </form>
        </mat-step>
      </mat-horizontal-stepper>
    </div>
  `
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