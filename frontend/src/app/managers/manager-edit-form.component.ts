import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Manager} from './manager.model';
import {ManagersApiService} from './managers-api.service';
import {Consultant} from '../consultants/consultant.model';
import {ConsultantsApiService} from '../consultants/consultants-api.service';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {concatMap, tap} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'manager-edit-form',
  templateUrl: 'manager-edit-form.component.html',
  styleUrls: ['managers.component.css']
})

export class ManagerEditFormComponent implements OnInit {

  manager: Manager;
  managersListSubs: Subscription;
  managerForm: FormGroup;

  consultantsList: Consultant[];
  dataSource: MatTableDataSource<Consultant>;

  constructor(private managersApi: ManagersApiService, private consultantsApi: ConsultantsApiService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    let managerId = parseInt(this.activatedRoute.snapshot.params["id"]);

    this.managerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      tel: ['', Validators.required],
    });

    this.managersListSubs = this.managersApi
      .getManager(managerId)
      .pipe(
        tap(res => {
          this.manager = res[0];
          this.managerForm.setValue({
            firstName: res[0].firstName,
            lastName: res[0].lastName,
            email: res[0].email,
            tel: res[0].tel,
          });
        }),
        concatMap(res => this.consultantsApi.getConsultantsForManager(this.manager.id))
      )
      .subscribe(res => {
          this.dataSource = new MatTableDataSource(res);
        },
        console.error
      );
  }

  updateManager() {
    this.manager.firstName = this.managerForm.get('firstName').value;
    this.manager.lastName = this.managerForm.get('lastName').value;
    this.manager.email = this.managerForm.get('email').value;
    this.manager.tel = this.managerForm.get('tel').value;

    this.managersApi
      .updateManager(this.manager)
      .subscribe(
        () => this.router.navigate(['/managers']),
        error => alert(error.message)
      );
  }

  addConsultant() {
    this.router.navigate(['/new-consultant/'+this.manager.id]);
  }

  deleteConsultant(id) {
    this.consultantsApi
      .deleteConsultant(id)
      .subscribe(
        err => console.log(err)
      );
  }

  displayedColumns: string[] = ['firstName','lastName','email','tel','edit','delete'];

}