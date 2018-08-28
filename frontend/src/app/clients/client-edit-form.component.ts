import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Client} from './client.model';
import {ClientsApiService} from './clients-api.service';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'client-edit-form',
  templateUrl: 'client-edit-form.component.html',
  styleUrls: ['clients.component.css']
})

export class ClientEditFormComponent implements OnInit {

  client: Client;
  clientsListSubs: Subscription;
  clientForm: FormGroup;

  constructor(private clientsApi: ClientsApiService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    let clientId = localStorage.getItem("editClientId");

    this.clientForm = this.formBuilder.group({
      id : [],
      name: ['', Validators.required],
      address: ['', Validators.required],
      cp: ['', Validators.required],
      city: ['', Validators.required],
    });

    this.clientsListSubs = this.clientsApi
      .getClient(clientId)
      .subscribe(res => {
          this.clientForm.setValue(res);
        },
        console.error
      );
  }

  updateClient() {
    this.clientsApi
      .saveClient(this.clientForm.value)
      .subscribe(
        () => this.router.navigate(['/clients']),
        error => alert(error.message)
      );
  }

}