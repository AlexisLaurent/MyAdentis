import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {ClientEmployee} from './clientEmployee.model';

@Injectable()
export class ClientEmployeesApiService {

  API_URL = "http://localhost:5000"
  
  constructor(private http: HttpClient) {
  }

  private handleError(err: HttpErrorResponse | any) {
    return throwError(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getClientEmployees(): Observable<ClientEmployee[]> {
    return this.http
      .get<ClientEmployee[]>(this.API_URL + "/clientEmployees")
      .pipe(
        catchError(this.handleError)
      );
  }

  // GET list of public, future events
  getClientEmployeesForClient(client_id: Number): Observable<ClientEmployee[]> {
    return this.http
      .get<ClientEmployee[]>(this.API_URL + "/clientEmployees/" + client_id)
      .pipe(
        catchError(this.handleError)
      );
  }

  getClientEmployee(id: Number): Observable<ClientEmployee> {
    return this.http
      .get<ClientEmployee>(this.API_URL + "/clientEmployee/" + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  saveClientEmployee(clientEmployee: ClientEmployee): Observable<any> {
    return this.http
      .post(this.API_URL + "/clientEmployees", clientEmployee)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateClientEmployee(clientEmployee: ClientEmployee): Observable<any> {
    return this.http
      .put(this.API_URL + "/clientEmployees/" + clientEmployee.id, clientEmployee)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteClientEmployee(id: Number): Observable<any> {
    return this.http
      .delete(this.API_URL + "/clientEmployee/delete/" + id)
      .pipe(
        catchError(this.handleError)
      );
  }
}