import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Manager} from './manager.model';

@Injectable()
export class ManagersApiService {

  API_URL = "http://localhost:5000"

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getManagers(): Observable<Manager[]> {
    return this.http
      .get<Manager[]>(this.API_URL + "/managers")
      .pipe(
        catchError(ManagersApiService._handleError)
      );
  }

  // GET Client
  getManager(id: Number): Observable<Manager> {
    return this.http
      .get<Manager>(this.API_URL + "/managers/" + id)
      .pipe(
        catchError(ManagersApiService._handleError)
      );
  }

  saveManager(manager: Manager): Observable<any> {
    return this.http
      .post(this.API_URL + "/managers", manager);
  }

  updateManager(manager: Manager): Observable<any> {
    return this.http
      .post(this.API_URL + "/managers/" + manager.id, manager);
  }
}