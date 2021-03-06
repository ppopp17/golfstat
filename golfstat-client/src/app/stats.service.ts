import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Stats } from './model/stats';
import { Golfer } from './model/golfer';
import { CoursePlusRatings } from './model/course-plus-ratings';
import { Course } from './model/course';
import { Score } from './model/score';
import { Round } from './model/round';
import { RoundAndCourse } from './model/round-and-course';
import { Score } from './model/score';
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

  getGolfersNotInRound(roundId: number): Observable<any> {
    return this.http.get<Golfer[]>(environment.serviceURL+'getGolfersNotInRound/'+roundId);
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

  addScores(newScores: Score[]): Observable<any> {
    return this.http.post(environment.serviceURL+'addNewScores', newScores, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  addNewRound(newRound: Round): Observable<any> {
    return this.http.post(environment.serviceURL+'addNewRound', newRound, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}
