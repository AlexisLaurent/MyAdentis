import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Meeting} from './meeting.model';

@Injectable()
export class MeetingsApiService {

  API_URL = "http://localhost:5000/"

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getMeetings(): Observable<Meeting[]> {
    return this.http
      .get<Meeting[]>(this.API_URL + "/meetings")
      .pipe(
        catchError(MeetingsApiService._handleError)
      );
  }

  saveMeeting(meeting: Meeting): Observable<any> {
    return this.http
      .post(this.API_URL + "/meetings", meeting);
  }
}