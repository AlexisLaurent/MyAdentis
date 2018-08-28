import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";
import {Manager} from './manager.model';
import {ManagersApiService} from './managers-api.service';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'manager-add-form',
  templateUrl: 'manager-add-form.component.html',
  styleUrls: ['managers.component.css']
})
export class ManagerAddFormComponent {
  manager = {
    firstName: '',
    lastName: '',
    email: '',
    tel: '',
  };

  managerForm: FormGroup;

  constructor(private managersApi: ManagersApiService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.managerForm = this.formBuilder.group({
      'firstName': [this.manager.firstName, [Validators.required]],
      'lastName': [this.manager.lastName, [Validators.required]],
      'email': [this.manager.email, [Validators.required]],
      'tel': [this.manager.tel, [Validators.required]],
    });
  }

  saveManager() {
    this.managersApi
      .saveManager(this.manager)
      .subscribe(
        () => this.router.navigate(['/managers']),
        error => alert(error.message)
      );
  }
}