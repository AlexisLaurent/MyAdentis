import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";
import {Client} from './client.model';
import {ClientsApiService} from './clients-api.service';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'client-add-form',
  templateUrl: 'client-add-form.component.html',
  styleUrls: ['clients.component.css']
})

export class ClientAddFormComponent implements OnInit {

  client = {
    name: '',
    address: '',
    cp: '',
    city: '',
  };

  clientForm: FormGroup;

  constructor(private clientsApi: ClientsApiService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      'name': [this.client.name, [Validators.required]],
      'address': [this.client.address, [Validators.required]],
      'cp': [this.client.cp, [Validators.required]],
      'city': [this.client.city, [Validators.required]],
    });
  }

  saveClient() {
    this.clientsApi
      .saveClient(this.client)
      .subscribe(
        () => this.router.navigate(['/clients']),
        error => alert(error.message)
      );
  }

}