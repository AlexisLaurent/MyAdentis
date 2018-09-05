import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Project} from './project.model';

@Injectable()
export class ProjectsApiService {

  API_URL = "http://localhost:5000"

  constructor(private http: HttpClient) {
  }

  private handleError(err: HttpErrorResponse | any) {
    return throwError(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getProjects(): Observable<Project[]> {
    return this.http
      .get<Project[]>(this.API_URL + "/projects")
      .pipe(
        catchError(this.handleError)
      );
  }

  getProject(id: Number): Observable<Project> {
    return this.http
      .get<Project>(this.API_URL + "/projects/" + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  saveProject(project: Project): Observable<any> {
    return this.http
      .post(this.API_URL + "/projects", project)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProject(project: Project): Observable<any> {
    return this.http
      .put(this.API_URL + "/projects/" + project.id, project)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteProject(id: Number): Observable<any> {
    return this.http
      .delete(this.API_URL + "/projects/" + id)
      .pipe(
        catchError(this.handleError)
      );
  }
}