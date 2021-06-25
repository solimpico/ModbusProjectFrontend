import { Component, OnInit } from '@angular/core';
import {Telemetry} from '../../model/telemetry';
import {TelemetryService} from '../../services/telemetry.service';
import {ActuatorsService} from '../../services/actuators.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  telemetryList: Telemetry[] = [];
  lastUpdate = '';
  motor =  false;
  temperatureValues: number[] = [];
  humidityValues: number[] = [];
  lineChart: Chart;


  constructor(private telemetryService: TelemetryService,
              private actuatorService: ActuatorsService) {}

  ngOnInit(): void {
    this.temperatureValues = [];
    this.humidityValues = [];
    this.telemetryList = [];
    this.telemetryService.getTelemetry().subscribe(list => {
        this.lastUpdate = new Date().getTime().toString();
        list.forEach(data => {
          if (data.type === 'Temperature'){
            this.temperatureValues.push(data.value);
            this.telemetryList.unshift(data);
          }
          else {
            this.telemetryList.unshift(data);
            this.humidityValues.push(data.value);
          }
        });
    });
    this.lineChart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Telemetry'
      },
      credits: {
        enabled: false
      },
      series: [{
        type: 'line',
        name: 'Temperature',
        data: this.temperatureValues
      }, {
        type: 'line',
        name: 'Humidity',
        data: this.humidityValues
      }]
    });
    setInterval(() => {
      this.updateTelemetry();
      this.lineChart = new Chart({
        chart: {
          type: 'line'
        },
        title: {
          text: 'Telemetry'
        },
        credits: {
          enabled: false
        },
        series: [{
          type: 'line',
          name: 'Temperature',
          data: this.temperatureValues
        }, {
          type: 'line',
          name: 'Humidity',
          data: this.humidityValues
        }]
      });
      this.checkLenght();
    }, 60000);

  }

  checkLenght(): void{
    if (this.temperatureValues.length > 20){
      this.temperatureValues.splice(0, 1);
    }
    if (this.humidityValues.length > 20){
      this.humidityValues.splice(0, 1);
    }
  }

  updateTelemetry(): void{
    this.telemetryService.getTelemetry().subscribe(list => {
      list.forEach(data => {
        if (data.type === 'Temperature'){
          this.temperatureValues.push(data.value);
          this.telemetryList[0] = data;
        }
        else {
          this.humidityValues.push(data.value);
          this.telemetryList[1] = data;
        }
      });
      this.lineChart = new Chart({
        chart: {
          type: 'line'
        },
        title: {
          text: 'Telemetry'
        },
        credits: {
          enabled: false
        },
        series: [{
          type: 'line',
          name: 'Temperature',
          data: this.temperatureValues
        }, {
          type: 'line',
          name: 'Humidity',
          data: this.humidityValues
        }]
      });
      this.lastUpdate = new Date().getTime().toString();
    });
  }

  motorOn(): void{
    this.actuatorService.turnOnMotor().subscribe(res => {
      this.motor = res;
    });
  }

  motorOff(): void{
    this.actuatorService.turnOffMotor().subscribe(res => {
      this.motor = res;
    });
  }
}
