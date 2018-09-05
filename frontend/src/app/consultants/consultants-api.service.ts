import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Consultant} from './consultant.model';

@Injectable()
export class ConsultantsApiService {

  API_URL = "http://localhost:5000"

  constructor(private http: HttpClient) {
  }

  private handleError(err: HttpErrorResponse | any) {
    return throwError(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getConsultants(): Observable<Consultant[]> {
    return this.http
      .get<Consultant[]>(this.API_URL + "/consultants")
      .pipe(
        catchError(this.handleError)
      );
  }

  // GET list of public, future events
  getConsultantsForManager(manager_id: Number): Observable<Consultant[]> {
    return this.http
      .get<Consultant[]>(this.API_URL + "/consultants/" + manager_id)
      .pipe(
        catchError(this.handleError)
      );
  }

   // GET Consultant
  getConsultant(id: Number): Observable<Consultant> {
    return this.http
      .get<Consultant>(this.API_URL + "/consultant/" + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  saveConsultant(consultant: Consultant): Observable<any> {
    return this.http
      .post(this.API_URL + "/consultants", consultant)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateConsultant(consultant: Consultant): Observable<any> {
    return this.http
      .put(this.API_URL + "/consultants/" + consultant.id, consultant)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteConsultant(id: Number): Observable<any> {
    return this.http
      .delete(this.API_URL + "/consultant/delete/" + id)
      .pipe(
        catchError(this.handleError)
      );
  }
}