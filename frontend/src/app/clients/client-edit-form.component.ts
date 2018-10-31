import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Client} from './client.model';
import {ClientsApiService} from './clients-api.service';
import {ClientEmployee} from '../clientEmployees/clientEmployee.model';
import {ClientEmployeesApiService} from '../clientEmployees/clientEmployees-api.service';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {concatMap, tap} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'client-edit-form',
  templateUrl: 'client-edit-form.component.html',
  styleUrls: ['clients.component.css']
})

export class ClientEditFormComponent implements OnInit {

  client: Client;
  clientsListSubs: Subscription;
  clientForm: FormGroup;

  clientEmployeesList: ClientEmployee[];
  dataSource: MatTableDataSource<ClientEmployee>;

  constructor(private clientsApi: ClientsApiService, private clientEmployeesApi: ClientEmployeesApiService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    let clientId = parseInt(this.activatedRoute.snapshot.params["id"]);

    this.clientForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      cp: ['', Validators.required],
      city: ['', Validators.required],
    });

    this.clientsListSubs = this.clientsApi
      .getClient(clientId)
      .pipe(
        tap(res => {
          this.client = res[0];
          this.clientForm.setValue({
            name: res[0].name,
            address: res[0].address,
            cp: res[0].cp,
            city: res[0].city,
          });
        }),
        concatMap(res => this.clientEmployeesApi.getClientEmployeesForClient(clientId))
      )
      .subscribe(res => {
          this.dataSource = new MatTableDataSource(res);
        },
        console.error
      );
  }

  updateClient() {
    this.client.name = this.clientForm.get('name').value;
    this.client.address = this.clientForm.get('address').value;
    this.client.cp = this.clientForm.get('cp').value;
    this.client.city = this.clientForm.get('city').value;

    this.clientsApi
      .updateClient(this.client)
      .subscribe(
        () => this.router.navigate(['/clients/'+this.client.id]),
        error => alert(error.message)
      );
  }

  addClientEmployee() {
    this.router.navigate(['/new-clientEmployee/'+this.client.id]);
  }

  deleteClientEmployee(id) {
    this.clientEmployeesApi
      .deleteClientEmployee(id)
      .subscribe( res => {
          this.dataSource = new MatTableDataSource(res);
        },
        console.error
      );
  }

  displayedColumns: string[] = ['firstName','lastName','email','tel', 'title', 'edit', 'delete'];

}