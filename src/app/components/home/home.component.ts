import { Component, OnInit } from '@angular/core';
import {Telemetry} from '../../model/telemetry';
import {TelemetryService} from '../../services/telemetry.service';
import {Timestamp} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  telemetryList: Telemetry[] = [];
  lastUpdate = '';

  constructor(private telemetryService: TelemetryService) { }

  ngOnInit(): void {
    this.telemetryService.getTelemetry().subscribe(list => {
      list.forEach(telemtry => {
        this.telemetryList.push(telemtry);
        this.lastUpdate = new Date().getTime().toString();
      });
    });
  }

  updateTelemetry(): void{
    this.telemetryService.getTelemetry().subscribe(list => {
      this.telemetryList = list;
      this.lastUpdate = new Date().getTime().toString();
    });
  }
}
