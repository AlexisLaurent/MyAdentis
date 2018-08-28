import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Client} from './client.model';
import {ClientsApiService} from './clients-api.service';

@Component({
  selector: 'clients',
  templateUrl: 'clients.component.html',
  styleUrls: ['clients.component.css'],
})

export class ClientsComponent implements OnInit, OnDestroy {

  clientsListSubs: Subscription;
  clientsList: Client[];
  dataSource: MatTableDataSource<Client>;

  constructor(private clientsApi: ClientsApiService, private router: Router,) { }

  ngOnInit() {
    this.clientsListSubs = this.clientsApi
      .getClients()
      .subscribe(res => {
          this.clientsList = res;
          this.dataSource = new MatTableDataSource(res);
        },
        console.error
      );
  }

  ngOnDestroy() {
    this.clientsListSubs.unsubscribe();
  }

  displayedColumns: string[] = ['name','address','cp','city', 'edit'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editClient(client: Client): void {
    localStorage.removeItem("editClientId");
    localStorage.setItem("editClientId", client.id.toString());
    this.router.navigate(['edit-client']);
  };
}