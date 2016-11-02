import { Component } from '@angular/core';
import { ProjectMetric } from './project-metric';
import { MetricDetail } from './metric-detail';

// webpack html imports
//let template = require('./metric-chart.html');

@Component({
  selector: 'metric-chart',
  template: `
<div class="row">
  <div class="col-md-6">
    <canvas baseChart width="400" height="400"
                [datasets]="lineChartData"
                [labels]="lineChartLabels"
                [options]="lineChartOptions"
                [colors]="lineChartColors"
                [legend]="lineChartLegend"
                [chartType]="lineChartType"
                (chartHover)="chartHovered($event)"
                (chartClick)="chartClicked($event)"></canvas>
  </div>
  <div class="col-md-6" style="margin-bottom: 10px;">
    <table class="table table-responsive table-condensed">
      <tr>
        <th *ngFor="let label of lineChartLabels">{{label}}</th>
      </tr>
      <tr *ngFor="let d of lineChartData">
        <td *ngFor="let label of lineChartLabels; let j=index">{{d && d.data[j]}}</td>
      </tr>
    </table>
    <button (click)="cargarData()">CLICK</button>
  </div>
</div>
  `
})
export class MetricChartComponent {
  // lineChart
    public lineChartData:Array<any> = [
        {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Miembro'}/*,
        {data: [28, 48, 40, 19, 86, 27, 90, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56, 55], label: 'Christian'},
        {data: [18, 48, 77, 9, 100, 27, 40, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56, 55], label: 'Series C'}*/
    ];
    public lineChartLabels:Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];

    public lineChartOptions:any = {
        animation: false,
        responsive: true
    };

    public lineChartColors:Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];

    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';

    public cargarData(projectMetrics: ProjectMetric[]):void { 
        let pmetric : ProjectMetric = projectMetrics[0];
        let days: Number = 0;
        if([0,2,4,6,7,9,11].includes(pmetric.month)) {
            days = 31;
        }
        else if([3,5,8,10].includes(pmetric.month)) {
            days = 30;
        }
        else {
            days = 28;
        }
        console.log(days);

        /*pm.details.forEach((detail) => {
                detail.fullDate = new Date(Date.parse(detail.date));
                detail.date = detail.fullDate.getDate();
                detail.month = detail.fullDate.getMonth();
            });*/

        let _lineChartData:Array<any> = new Array(pmetric.membersSummary.length);
        for (let i = 0; i < pmetric.membersSummary.length; i++) {
            _lineChartData[i] = {data: new Array(days), label: pmetric.membersSummary[i].name};
            for (let j = 0; j < days; j++) {
                let detail : MetricDetail = pmetric.details.find((detail, index, obj) =>  { return detail.date == (j + 1)})
                if(detail != null) {
                    _lineChartData[i].data[j] = detail.metricData.hours;
                }
                else {
                    _lineChartData[i].data[j] = 0;
                }
            }
        }
        /*for (let i = 0; i < days; i++) {
            _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
            for (let j = 0; j < this.lineChartData[i].data.length; j++) {
                _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
            }
        }*/
        /*let _lineChartData:Array<any> = new Array(this.lineChartData.length);
        for (let i = 0; i < this.lineChartData.length; i++) {
            _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
            for (let j = 0; j < this.lineChartData[i].data.length; j++) {
                _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
            }
        }*/
        this.lineChartData = _lineChartData;
    }

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }
}