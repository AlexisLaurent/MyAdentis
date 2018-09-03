import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Consultant} from './consultant.model';
import {ConsultantsApiService} from './consultants-api.service';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'consultant-add-form',
  templateUrl: 'consultant-add-form.component.html',
  styleUrls: ['consultants.component.css']
})
export class ConsultantAddFormComponent {
  
  consultant = new Consultant();
  consultantForm: FormGroup;

  constructor(private consultantsApi: ConsultantsApiService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.consultant.manager_id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

    this.consultantForm = this.formBuilder.group({
      'firstName': [this.consultant.firstName, [Validators.required]],
      'lastName': [this.consultant.lastName, [Validators.required]],
      'email': [this.consultant.email, [Validators.required]],
      'tel': [this.consultant.tel, [Validators.required]],
    });
  }

  saveConsultant() {
    this.consultantsApi
      .saveConsultant(this.consultant)
      .subscribe(
        () => this.router.navigate(['/consultants']),
        error => alert(error.message)
      );
  }
}