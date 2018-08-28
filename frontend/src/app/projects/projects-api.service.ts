import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Project} from './project.model';

@Injectable()
export class ProjectsApiService {

  API_URL = "http://localhost:5000"

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getProjects(): Observable<Project[]> {
    return this.http
      .get<Project[]>(this.API_URL + "/projects")
      .pipe(
        catchError(ProjectsApiService._handleError)
      );
  }

  saveProject(project: Project): Observable<any> {
    return this.http
      .post(this.API_URL + "/projects", project);
  }
}