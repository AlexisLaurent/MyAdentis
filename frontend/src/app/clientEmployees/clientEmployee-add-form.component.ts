import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {ClientEmployee} from './ClientEmployee.model';
import {ClientEmployeesApiService} from './clientEmployees-api.service';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'clientEmployee-add-form',
  templateUrl: 'clientEmployee-add-form.component.html',
  styleUrls: ['clientEmployees.component.css']
})
export class ClientEmployeeAddFormComponent {

  client_id: number;

  clientEmployee = {
    firstName: '',
    lastName: '',
    email: '',
    tel: '',
    title: '',
    client_id: this.client_id,
  };

  clientEmployeeForm: FormGroup;

  constructor(private clientEmployeesApi: ClientEmployeesApiService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.clientEmployee.client_id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

    this.clientEmployeeForm = this.formBuilder.group({
      'firstName': [this.clientEmployee.firstName, [Validators.required]],
      'lastName': [this.clientEmployee.lastName, [Validators.required]],
      'email': [this.clientEmployee.email, [Validators.required]],
      'tel': [this.clientEmployee.tel, [Validators.required]],
      'title': [this.clientEmployee.title, [Validators.required]],
    });
  }

  saveClientEmployee() {
    this.clientEmployeesApi
      .saveClientEmployee(this.clientEmployee)
      .subscribe(
        () => this.router.navigate(['/clients']),
        error => alert(error.message)
      );
  }
}