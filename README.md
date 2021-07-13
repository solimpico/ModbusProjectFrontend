# ModbusProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.13.

This project implements the user interface of "ModbusProject". 
With the user interface it is possible to observe the latest telemetry data detected, a data history, the average of the measurements and the occurrence values.
It is also possible to control an actuator (engine) using the appropriate button.

To display the data in the form of a graph it is necessary to use the highcharts library that can be installed with the " npm i --save angular-highcharts highcharts" command.

The project is development using TypeScript with the Angular framework.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## COMPLETE GUIDE FOR THE EXECUTION OF THE USE CASE
1) Execute the simulated machinery [ModbusProjectSlave: https://github.com/solimpico/ModbusProjectSlave.git] in your raspberry with the comand "sudo python3 namefile.py".
For more details, read the README file in  solimpico/ModbusProjectSlave.
2) Execute the backend [solimpico/ModbusProject: https://github.com/solimpico/ModbusProject.git] in your gateway with the comand "java -jar MyModbusProject-0.0.1-SNAPSHOT.jar". 
3) Exectute the frontend server [this project] with the commands above.
