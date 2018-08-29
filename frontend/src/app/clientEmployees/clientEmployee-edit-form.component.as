import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {ClientEmployee} from './clientEmployee.model';
import {ClientEmployeesApiService} from './clientEmployees-api.service';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'clientEmployee-edit-form',
  templateUrl: 'clientEmployee-edit-form.component.html',
  styleUrls: ['clientEmployees.component.css']
})

export class ClientEmployeeEditFormComponent implements OnInit {

  clientEmployee: ClientEmployee;
  clientEmployeesListSubs: Subscription;
  clientEmployeeForm: FormGroup;

  constructor(private clientEmployeesApi: ClientEmployeesApiService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    let clientEmployeeId = parseInt(localStorage.getItem("editClientEmployeeId"));

    this.clientEmployeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      tel: ['', Validators.required],
      title: ['', Validators.required],
    });

    this.clientEmployeesListSubs = this.clientEmployeesApi
      .getClientEmployee(clientEmployeeId)
      .subscribe(res => {
          this.clientEmployee = res[0];
          this.clientEmployeeForm.setValue({
            firstName: res[0].firstName,
            lastName: res[0].lastName,
            email: res[0].email,
            tel: res[0].tel,
            title: res[0].title,
          });
        },
        console.error
      );
  }

  updateClientEmployee() {
    this.clientEmployee.firstName = this.clientEmployeeForm.get('firstName').value;
    this.clientEmployee.lastName = this.clientEmployeeForm.get('lastName').value;
    this.clientEmployee.email = this.clientEmployeeForm.get('email').value;
    this.clientEmployee.tel = this.clientEmployeeForm.get('tel').value;
    this.clientEmployee.title = this.clientEmployeeForm.get('title').value;

    this.clientEmployeesApi
      .updateClientEmployee(this.clientEmployee)
      .subscribe(
        () => this.router.navigate(['/clients']),
        error => alert(error.message)
      );
  }

}