"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
// webpack html imports
//let template = require('./metric-chart.html');
var MetricChartComponent = (function () {
    function MetricChartComponent() {
        // lineChart
        this.lineChartData = [
            { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Miembro' } /*,
            {data: [28, 48, 40, 19, 86, 27, 90, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56, 55], label: 'Christian'},
            {data: [18, 48, 77, 9, 100, 27, 40, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56, 55], label: 'Series C'}*/
        ];
        this.lineChartLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
            '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
            '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
        this.lineChartOptions = {
            animation: false,
            responsive: true
        };
        this.lineChartColors = [
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                backgroundColor: 'rgba(77,83,96,0.2)',
                borderColor: 'rgba(77,83,96,1)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            },
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
    }
    MetricChartComponent.prototype.cargarData = function (projectMetrics) {
        var pmetric = projectMetrics[0];
        var days = 0;
        if ([0, 2, 4, 6, 7, 9, 11].includes(pmetric.month)) {
            days = 31;
        }
        else if ([3, 5, 8, 10].includes(pmetric.month)) {
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
        var _lineChartData = new Array(pmetric.membersSummary.length);
        for (var i = 0; i < pmetric.membersSummary.length; i++) {
            _lineChartData[i] = { data: new Array(days), label: pmetric.membersSummary[i].name };
            var _loop_1 = function(j) {
                var detail = pmetric.details.find(function (detail, index, obj) { return detail.date == (j + 1); });
                if (detail != null) {
                    _lineChartData[i].data[j] = detail.metricData.hours;
                }
                else {
                    _lineChartData[i].data[j] = 0;
                }
            };
            for (var j = 0; j < days; j++) {
                _loop_1(j);
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
    };
    // events
    MetricChartComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    MetricChartComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    MetricChartComponent = __decorate([
        core_1.Component({
            selector: 'metric-chart',
            template: "\n<div class=\"row\">\n  <div class=\"col-md-6\">\n    <canvas baseChart width=\"400\" height=\"400\"\n                [datasets]=\"lineChartData\"\n                [labels]=\"lineChartLabels\"\n                [options]=\"lineChartOptions\"\n                [colors]=\"lineChartColors\"\n                [legend]=\"lineChartLegend\"\n                [chartType]=\"lineChartType\"\n                (chartHover)=\"chartHovered($event)\"\n                (chartClick)=\"chartClicked($event)\"></canvas>\n  </div>\n  <div class=\"col-md-6\" style=\"margin-bottom: 10px;\">\n    <table class=\"table table-responsive table-condensed\">\n      <tr>\n        <th *ngFor=\"let label of lineChartLabels\">{{label}}</th>\n      </tr>\n      <tr *ngFor=\"let d of lineChartData\">\n        <td *ngFor=\"let label of lineChartLabels; let j=index\">{{d && d.data[j]}}</td>\n      </tr>\n    </table>\n    <button (click)=\"cargarData()\">CLICK</button>\n  </div>\n</div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], MetricChartComponent);
    return MetricChartComponent;
}());
exports.MetricChartComponent = MetricChartComponent;
//# sourceMappingURL=metric-chart.js.map