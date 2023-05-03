import { Injectable } from '@angular/core';
import { Layout } from '../Model/Layout';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL:string = "http://localhost:35137/api/LocationTracker/";
  GetLayoutURL:string = this.baseURL+"GetLayout";
  GetUserURL:string = this.baseURL+"GetUserList";

  locations:Layout[];
  constructor(private http: HttpClient) {
    this.locations = [
      { Id: 1, Name: 'Location 1', Img: 'img1.png', XCoord: 10, YCoord: 20 },
      { Id: 2, Name: 'Location 2', Img: 'img2.png', XCoord: 30, YCoord: 40 },
    ];
  }

  GetLayout(): Observable<any>{
    return this.http.get(this.GetLayoutURL);
  }

  GetUser(): Observable<any>{
    return this.http.get(this.GetUserURL);
  }

  fetchLayout(){

  }

}
