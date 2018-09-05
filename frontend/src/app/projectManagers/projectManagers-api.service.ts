import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {ProjectManager} from './projectManager.model';

@Injectable()
export class ProjectManagersApiService {

  API_URL = "http://localhost:5000/"

  constructor(private http: HttpClient) {
  }

  private handleError(err: HttpErrorResponse | any) {
    return throwError(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getProjectManagers(): Observable<ProjectManager[]> {
    return this.http
      .get<ProjectManager[]>(this.API_URL + "/projectManagers")
      .pipe(
        catchError(this.handleError)
      );
  }

  getProjectManager(id: Number): Observable<ProjectManager> {
    return this.http
      .get<ProjectManager>(this.API_URL + "/projectManagers/" + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  saveProjectManager(projectManager: ProjectManager): Observable<any> {
    return this.http
      .post(this.API_URL + "/projectManagers", projectManager)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProjectManager(projectManager: ProjectManager): Observable<any> {
    return this.http
      .put(this.API_URL + "/projectManagers/" + projectManager.id, projectManager)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteProjectManager(id: Number): Observable<any> {
    return this.http
      .delete(this.API_URL + "/projectManager/" + id)
      .pipe(
        catchError(this.handleError)
      );
  }
}