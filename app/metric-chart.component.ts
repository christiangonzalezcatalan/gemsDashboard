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
    <canvas baseChart width="800" height="500"
                [datasets]="lineChartData"
                [labels]="lineChartLabels"
                [options]="lineChartOptions"
                [colors]="lineChartColors"
                [legend]="lineChartLegend"
                [chartType]="lineChartType"
                (chartHover)="chartHovered($event)"
                (chartClick)="chartClicked($event)"></canvas>
  </div>
  <!--<div class="col-md-6" style="margin-bottom: 10px;">
    <table class="table table-responsive table-condensed">
      <tr>
        <th *ngFor="let label of lineChartLabels">{{label}}</th>
      </tr>
      <tr *ngFor="let d of lineChartData">
        <td *ngFor="let label of lineChartLabels; let j=index">{{d && d.data[j]}}</td>
      </tr>
    </table>
    <button (click)="cargarData()">CLICK</button>
  </div>-->
</div>
  `
})
export class MetricChartComponent {
  // lineChart
    public lineChartData:Array<any> = [
        {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Miembro'}/*,
        {data: [28, 48, 40, 19, 86, 27, 90, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56], label: 'Christian'},
        {data: [18, 48, 77, 9, 100, 27, 40, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56], label: 'Series C'}*/
    ];
    public lineChartLabels:Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];//, '31'];

    public lineChartOptions:any = {
        title: {
            display: true,
            fontSize: 16,
            padding: 20,
            text: 'Gráfico de horas trabajadas'
        },
        animation: false,
        responsive: false,
        scales: {
            yAxes: [{
                ticks: {
                    max: 20,
                    min: 0,
                    stepSize: 1
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Horas'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Día del mes'
                }
            }]
        }
    };

    /*options = {
  scales: {
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'probability'
      }
    }]
  }
}*/

    public lineChartColors:Array<any> = [
        {
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(55,172,172,1)',
            pointBackgroundColor: 'rgba(75,192,192,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(75,192,192,1)'
        },
        {
            backgroundColor: 'rgba(255,180,100,1)',
            borderColor: 'rgba(255,122,13,1)',
            pointBackgroundColor: 'rgba(255,180,100,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,180,100,1)'
        },
        {
            backgroundColor: 'rgba(54,162,235,1)',
            borderColor: 'rgba(34,142,215,1)',
            pointBackgroundColor: 'rgba(54,162,235,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(54,162,235,1)'
        },
        {
            backgroundColor: 'rgba(255,99,132,1)',
            borderColor: 'rgba(235,79,112,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)'
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

        let _lineChartData:Array<any> = new Array(4); //new Array(pmetric.membersSummary.length);
        ////for (let i = 0; i < pmetric.membersSummary.length; i++) {
            let i = 0;
            _lineChartData[i+3] = {data: new Array(days), label: 'Horas trabajadas en otros proyectos no asignados'};//pmetric.membersSummary[i].name};
            _lineChartData[i+2] = {data: new Array(days), label: 'Horas trabajadas en otros proyectos'};//pmetric.membersSummary[i].name};
            _lineChartData[i+1] = {data: new Array(days), label: 'Horas trabajadas no asignadas'};//pmetric.membersSummary[i].name};
            _lineChartData[i] = {data: new Array(days), label: 'Horas trabajadas'};//pmetric.membersSummary[i].name};

            for (let j = 0; j < days; j++) {
                _lineChartData[i].data[j] = 0;
                _lineChartData[i+1].data[j] = 0;
                _lineChartData[i+2].data[j] = 0;
                _lineChartData[i+3].data[j] = 0;

                let details : MetricDetail[] = pmetric.details.filter((detail, index, obj) =>  { return detail.date == (j + 1)})
                for (let detail of details) {
                    _lineChartData[i+3].data[j] += detail.metricData.otherProjectNotPlannedHours || 0;
                    _lineChartData[i+2].data[j] += detail.metricData.otherProjectHours || 0;
                    _lineChartData[i+1].data[j] += detail.metricData.notPlannedWorkedHours || 0;
                    _lineChartData[i].data[j] += detail.metricData.workedHours || 0;
                }

                // Para el efecto del gráfico
                _lineChartData[i+1].data[j] += _lineChartData[i].data[j];
                _lineChartData[i+2].data[j] += _lineChartData[i+1].data[j];
                _lineChartData[i+3].data[j] += _lineChartData[i+2].data[j];
            }
        //}

        console.log(this.lineChartData);
        console.log(_lineChartData);
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