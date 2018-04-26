import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Stats } from './model/stats';
import { Golfer } from './model/golfer';
import { CoursePlusRating } from './model/course-plus-rating';
import { environment } from '../environments/environment';

@Injectable()
export class StatsService {

  constructor(
    private http:HttpClient
  ) { }

  getStats(): Observable<any> {
    return this.http.get<Stats>(environment.serviceURL+'stats');
  }

  getGolfers(): Observable<any> {
    return this.http.get<Golfer[]>(environment.serviceURL+'getGolfers');
  }

  addNewGolfer(golfer: Golfer): Observable<any> {
    return this.http.post(environment.serviceURL+'addNewGolfers', golfer, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  getCourses(): Observable<any> {
    return this.http.get<CoursePlusRating[]>(environment.serviceURL+'getCourses');
  }

  addNewCourse(newCourse: CoursePlusRating): Observable<any> {
    return this.http.post(environment.serviceURL+'addNewCourse', newCourse, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

}
