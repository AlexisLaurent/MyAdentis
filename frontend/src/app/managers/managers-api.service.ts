import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Manager} from './manager.model';

@Injectable()
export class ManagersApiService {

  API_URL = "http://localhost:5000"

  constructor(private http: HttpClient) {
  }

  private handleError(err: HttpErrorResponse | any) {
    return throwError(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getManagers(): Observable<Manager[]> {
    return this.http
      .get<Manager[]>(this.API_URL + "/managers")
      .pipe(
        catchError(this.handleError)
      );
  }

  // GET Client
  getManager(id: Number): Observable<Manager> {
    return this.http
      .get<Manager>(this.API_URL + "/managers/" + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  saveManager(manager: Manager): Observable<any> {
    return this.http
      .post(this.API_URL + "/managers", manager)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateManager(manager: Manager): Observable<any> {
    return this.http
      .post(this.API_URL + "/managers/" + manager.id, manager)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteManager(id: Number): Observable<any> {
    return this.http
      .delete(this.API_URL + "/manager/delete/" + id)
      .pipe(
        catchError(this.handleError)
      );
  }
}