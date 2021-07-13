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
  averageTemp = 0;
  averageHum = 0;
  temperatureOccurenceValue: number[];
  humidityOccurenceValue: number[];
  temperatureOccurence: number[];
  humidityOccurence: number[];
  lastTemperature: number;
  lastHumidity: number;
  more = false;


  constructor(private telemetryService: TelemetryService,
              private actuatorService: ActuatorsService) {}

  ngOnInit(): void {
    this.temperatureValues = [];
    this.humidityValues = [];
    this.telemetryList = [];
    this.more = false;
    this.telemetryService.getTelemetry().subscribe(list => {
        this.lastUpdate = new Date().getTime().toString();
        list.forEach(data => {
          if (data.type === 'Temperature'){
            this.temperatureValues.push(data.value);
            this.lastTemperature = data.value;
            this.telemetryList.push(data);
          }
          else {
            this.telemetryList.push(data);
            this.lastHumidity = data.value;
            this.humidityValues.push(data.value);
          }
        });
    });
    this.lineChart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Data history'
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
    this.calculateAvg();
    this.calculate(this.temperatureValues, 'temp');
    this.calculate(this.humidityValues, 'hum');
    this.updateTelemetry();
    setInterval(() => {
      this.updateTelemetry();
    }, 60000);

  }

  checkLenght(): void{
    if (this.temperatureValues.length > 100){
      this.temperatureValues.splice(0, 1);
    }
    if (this.humidityValues.length > 100){
      this.humidityValues.splice(0, 1);
    }
  }

  updateTelemetry(): void{
    this.telemetryService.getTelemetry().subscribe(list => {
      list.forEach(data => {
        if (data.type === 'Temperature'){
          this.temperatureValues.push(data.value);
          this.telemetryList[0] = data;
          this.lastTemperature = data.value;
          // 0 = temperature
          this.lineChart.addPoint(data.value, 0, true, false);
        }
        else {
          this.humidityValues.push(data.value);
          this.telemetryList[1] = data;
          this.lastHumidity = data.value;
          // 1 = humidity
          this.lineChart.addPoint(data.value, 1, true, false);
        }
      });
      this.checkLenght();
      this.calculateAvg();
      this.calculate(this.temperatureValues, 'temp');
      this.calculate(this.humidityValues, 'hum');
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

  calculateAvg(): void{
    this.averageTemp = 0;
    if (this.temperatureValues.length !== 0){
      this.temperatureValues.forEach(value => {
        this.averageTemp = this.averageTemp + value;
      });
      this.averageTemp = parseFloat((this.averageTemp / this.temperatureValues.length).toFixed(2));
    }
    this.averageHum = 0;
    if (this.humidityValues.length !== 0){
      this.humidityValues.forEach(value => {
        this.averageHum = this.averageHum + value;
      });
      this.averageHum = parseFloat((this.averageHum / this.humidityValues.length).toFixed(2));
    }
  }

  calculate(arr: number[], type: string): void {
    if (type === 'temp') {
      const a = [];
      const b = [];
      let prev;
      arr.sort();
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== prev) {
          a.push(arr[i]);
          b.push(1);
        } else {
          b[b.length - 1]++;
        }
        prev = arr[i];
      }
      this.temperatureOccurenceValue = a;
      this.temperatureOccurence = b;
    }
    if (type === 'hum') {
      const a = [];
      const b = [];
      let prev;
      arr.sort();
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== prev) {
          a.push(arr[i]);
          b.push(1);
        } else {
          b[b.length - 1]++;
        }
        prev = arr[i];
      }
      this.humidityOccurenceValue = a;
      this.humidityOccurence = b;
    }
  }

  showMore(): void{
    if (!this.more){
      this.updateTelemetry();
    }
    this.more = !this.more;
  }

}
