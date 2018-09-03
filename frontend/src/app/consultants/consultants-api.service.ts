import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Consultant} from './consultant.model';

@Injectable()
export class ConsultantsApiService {

  API_URL = "http://localhost:5000"

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getConsultants(): Observable<Consultant[]> {
    return this.http
      .get<Consultant[]>(this.API_URL + "/consultants")
      .pipe(
        catchError(ConsultantsApiService._handleError)
      );
  }

  // GET list of public, future events
  getConsultantsForManager(manager_id: Number): Observable<Consultant[]> {
    return this.http
      .get<Consultant[]>(this.API_URL + "/consultants/" + manager_id)
      .pipe(
        catchError(ConsultantsApiService._handleError)
      );
  }

   // GET Consultant
  getConsultant(id: Number): Observable<Consultant> {
    return this.http
      .get<Consultant>(this.API_URL + "/consultant/" + id)
      .pipe(
        catchError(ConsultantsApiService._handleError)
      );
  }

  saveConsultant(consultant: Consultant): Observable<any> {
    return this.http
      .post(this.API_URL + "/consultants", consultant);
  }

  updateConsultant(consultant: Consultant): Observable<any> {
    return this.http
      .post(this.API_URL + "/consultants/" + consultant.id, consultant);
  }

  deleteConsultant(id: Number): Observable<any> {
    return this.http
      .delete(this.API_URL + "/consultant/delete/" + id)
  }
}