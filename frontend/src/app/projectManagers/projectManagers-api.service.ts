import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ProjectManager} from './projectManager.model';

@Injectable()
export class ProjectManagersApiService {

  API_URL = "http://localhost:5000/"

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getProjectManagers(): Observable<ProjectManager[]> {
    return this.http
      .get<ProjectManager[]>(this.API_URL + "/projectManagers")
      .pipe(
        catchError(ProjectManagersApiService._handleError)
      );
  }

  saveProjectManager(projectManager: ProjectManager): Observable<any> {
    return this.http
      .post(this.API_URL + "/projectManagers", projectManager);
  }
}