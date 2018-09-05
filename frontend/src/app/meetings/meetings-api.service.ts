import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Meeting} from './meeting.model';

@Injectable()
export class MeetingsApiService {

  API_URL = "http://localhost:5000/"

  constructor(private http: HttpClient) {
  }

  private handleError(err: HttpErrorResponse | any) {
    return throwError(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getMeetings(): Observable<Meeting[]> {
    return this.http
      .get<Meeting[]>(this.API_URL + "/meetings")
      .pipe(
        catchError(this.handleError)
      );
  }

  // GET Meeting
  getMeeting(id: Number): Observable<Meeting> {
    return this.http
      .get<Meeting>(this.API_URL + "/meetings/" + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  saveMeeting(meeting: Meeting): Observable<any> {
    return this.http
      .post(this.API_URL + "/meetings", meeting)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateMeeting(meeting: Meeting): Observable<any> {
    return this.http
      .put(this.API_URL + "/meetings/" + meeting.id, meeting)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteClient(id: Number): Observable<any> {
    return this.http
      .delete(this.API_URL + "/meetings/" + id)
      .pipe(
        catchError(this.handleError)
      );
  }
}