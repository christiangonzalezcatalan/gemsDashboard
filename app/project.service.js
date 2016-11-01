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
var ProjectService = (function () {
    function ProjectService(http) {
        this.http = http;
        this.projectConfigMetricsUrl = 'http://localhost:8080/projects?toolName=Redmine&processName=NotAssignedWorkMetric';
    }
    /*getProjectForMetrics(): Observable<Project[]> {
        return this.http.get(this.projectConfigMetricsUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }*/
    ProjectService.prototype.getProjectForMetrics = function () {
        return this.http.get(this.projectConfigMetricsUrl)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    /*private fromJSONArray(array: Array<Object>): ProjectMetric[] {
        return array.map(obj => new ProjectMetric(obj['id'], obj['name']));
    }*/
    ProjectService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    /*private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }*/
    ProjectService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    ProjectService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ProjectService);
    return ProjectService;
}());
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map