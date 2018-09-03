import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Consultant} from './consultant.model';
import {ConsultantsApiService} from './consultants-api.service';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'consultant-edit-form',
  templateUrl: 'consultant-edit-form.component.html',
  styleUrls: ['consultants.component.css']
})

export class ConsultantEditFormComponent implements OnInit {

  consultant: Consultant;
  consultantsListSubs: Subscription;
  consultantForm: FormGroup;

  constructor(private consultantsApi: ConsultantsApiService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    let consultantId = parseInt(this.activatedRoute.snapshot.params["id"]);

    this.consultantForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      tel: ['', Validators.required],
    });

    this.consultantsListSubs = this.consultantsApi
      .getConsultant(consultantId)
      .subscribe(res => {
          this.consultant = res[0];
          this.consultantForm.setValue({
            firstName: res[0].firstName,
            lastName: res[0].lastName,
            email: res[0].email,
            tel: res[0].tel,
          });
        },
        console.error
      );
  }

  updateConsultant() {
    this.consultant.firstName = this.consultantForm.get('firstName').value;
    this.consultant.lastName = this.consultantForm.get('lastName').value;
    this.consultant.email = this.consultantForm.get('email').value;
    this.consultant.tel = this.consultantForm.get('tel').value;

    this.consultantsApi
      .updateConsultant(this.consultant)
      .subscribe(
        () => this.router.navigate(['/edit-consultant/'+this.consultant.manager_id]),
        error => alert(error.message)
      );
  }

}