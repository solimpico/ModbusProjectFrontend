import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Telemetry} from '../model/telemetry';

@Injectable({
  providedIn: 'root'
})
export class ActuatorsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  turnOnMotor(): Observable<boolean> {
    return this.http.put<boolean>('http://localhost:8080/motorOn', null, this.httpOptions);
  }

  turnOffMotor(): Observable<boolean> {
    return this.http.put<boolean>('http://localhost:8080/motorOff', null, this.httpOptions);
  }

  getMotorStatus(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8080/getMotorStatus');
  }
}
