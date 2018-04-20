import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Stats } from './model/stats';
import { environment } from '../environments/environment';

@Injectable()
export class StatsService {

  constructor(
    private http:HttpClient
  ) { }

  getStats(): Observable<any> {
    return this.http.get<Stats>(environment.serviceURL+'stats');
  }
}
