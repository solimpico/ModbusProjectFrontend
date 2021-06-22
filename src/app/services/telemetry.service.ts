import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Telemetry} from '../model/telemetry';

@Injectable({
  providedIn: 'root'
})
export class TelemetryService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getTelemetry(): Observable<Telemetry[]>{
    return this.http.get<Telemetry[]>('http://localhost:8080/telemetry/temperatureAndHumidity');
  }
}
