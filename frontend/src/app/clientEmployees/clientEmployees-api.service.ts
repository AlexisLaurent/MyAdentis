import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ClientEmployee} from './clientEmployee.model';

@Injectable()
export class ClientEmployeesApiService {

  API_URL = "http://localhost:5000"
  
  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getClientEmployees(): Observable<ClientEmployee[]> {
    return this.http
      .get<ClientEmployee[]>(this.API_URL + "/clientEmployees")
      .pipe(
        catchError(ClientEmployeesApiService._handleError)
      );
  }

  saveClientEmployee(clientEmployee: ClientEmployee): Observable<any> {
    return this.http
      .post(this.API_URL + "/clientEmployees", clientEmployee);
  }
}