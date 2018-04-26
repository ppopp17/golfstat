import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Stats } from './model/stats';
import { Golfer } from './model/golfer';
import { CoursePlusRatings } from './model/course-plus-ratings';
import { Course } from './model/course';
import { RoundAndCourse } from './model/round-and-course';
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

  getRounds(): Observable<any> {
    return this.http.get<RoundAndCourse[]>(environment.serviceURL+'getAllRounds');
  }

  getCourses(): Observable<any> {
    return this.http.get<Course[]>(environment.serviceURL+'getCourses');
  }

  getCoursesPlusRatings(): Observable<any> {
    return this.http.get<CoursePlusRatings[]>(environment.serviceURL+'getCoursesPlusRatings');
  }

  addNewCourse(newCourse: CoursePlusRatings): Observable<any> {
    return this.http.post(environment.serviceURL+'addNewCourse', newCourse, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

}
