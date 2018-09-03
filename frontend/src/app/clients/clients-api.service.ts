import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Client} from './client.model';

@Injectable()
export class ClientsApiService {

  API_URL = "http://localhost:5000"

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getClients(): Observable<Client[]> {
    return this.http
      .get<Client[]>(this.API_URL + "/clients")
      .pipe(
        catchError(ClientsApiService._handleError)
      );
  }

  // GET Client
  getClient(id: Number): Observable<Client> {
    return this.http
      .get<Client>(this.API_URL + "/clients/" + id)
      .pipe(
        catchError(ClientsApiService._handleError)
      );
  }

  saveClient(client: Client): Observable<any> {
    return this.http
      .post(this.API_URL + "/clients", client);
  }

  updateClient(client: Client): Observable<any> {
    return this.http
      .post(this.API_URL + "/clients/" + client.id, client);
  }

  deleteClient(id: Number): Observable<any> {
    return this.http
      .delete(this.API_URL + "/client/delete/" + id)
  }
}