import { Injectable ,Output,EventEmitter} from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable, BehaviorSubject } from 'rxjs'
import {environment} from '../../environments/environment'

const API_BASE_URL = environment.testurl;

@Injectable({
  providedIn: 'root'
})
export class CommanServiceService {
  httpHeader = { headers: new HttpHeaders({
    'NoAuth': 'True',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    'Access-Control-Allow-Credentials': 'true'
  })};
  constructor(private http: HttpClient) { }
  @Output()filterDate = new EventEmitter <any> ()
  get(url): Observable<any> {
    return this.http.get(API_BASE_URL + url);
  }

  post(url, body: any): Observable<any> {
    return this.http.post(API_BASE_URL + url, body, this.httpHeader);
  }

  getDate(event: any) {
    this.filterDate.emit(event)
  }
  

 



}
