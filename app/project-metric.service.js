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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var Observable_1 = require('rxjs/Observable');
//import { METRICS } from './mock-project-metric'
var ProjectMetricService = (function () {
    //private projectMetricsUrl = 'http://localhost:8080/projectMetrics';  // URL to web api
    //private projectMetricsUrl = 'http://localhost:8080/projectMetrics?projectId=57cc59368acec62bf2f7d7ed&name=Horas trabajadas en otros proyectos&year=2016&month=9';
    function ProjectMetricService(http) {
        this.http = http;
    }
    ProjectMetricService.prototype.getProjectMetrics = function (projectId) {
        var projectMetricsUrl = 'http://localhost:8080/projectMetrics?projectId=' + projectId + '&name=Horas trabajadas en otros proyectos&year=2016&month=9';
        //return this.http.get(this.projectMetricsUrl)
        console.log(projectMetricsUrl);
        return this.http.get(projectMetricsUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    /*private fromJSONArray(array: Array<Object>): ProjectMetric[] {
        return array.map(obj => new ProjectMetric(obj['id'], obj['name']));
    }*/
    ProjectMetricService.prototype.extractData = function (res) {
        var body = res.json();
        console.log(body);
        return body;
    };
    ProjectMetricService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    ProjectMetricService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ProjectMetricService);
    return ProjectMetricService;
}());
exports.ProjectMetricService = ProjectMetricService;
//# sourceMappingURL=project-metric.service.js.map