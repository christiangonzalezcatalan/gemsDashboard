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
var core_2 = require('@angular/core');
var project_metric_service_1 = require('./project-metric.service');
var metric_chart_1 = require('./metric-chart');
require('./rxjs-operator');
var ProjectMetricDetailComponent = (function () {
    function ProjectMetricDetailComponent(projectMetricService) {
        this.projectMetricService = projectMetricService;
    }
    ProjectMetricDetailComponent.prototype.getProjectMetrics = function (projectId) {
        var _this = this;
        this.projectMetricService.getProjectMetrics(projectId).subscribe(function (projectMetrics) {
            _this.projectMetrics = projectMetrics;
            _this.metricChartComponent.cargarData(projectMetrics);
        }, function (error) { return _this.errorMessage = error; });
        //this.metricChartComponent.cargarData()
    };
    __decorate([
        core_1.ViewChild(metric_chart_1.MetricChartComponent), 
        __metadata('design:type', metric_chart_1.MetricChartComponent)
    ], ProjectMetricDetailComponent.prototype, "metricChartComponent", void 0);
    ProjectMetricDetailComponent = __decorate([
        core_2.Component({
            selector: 'project-metric-detail',
            template: "\n    <div *ngFor=\"let projectMetric of projectMetrics\">\n      <h2>{{projectMetric.name}} details!</h2>\n      <div><label>id: </label>{{projectMetric.id}}</div>\n      <div>\n        <label>name: </label>\n        {{projectMetric.name}}\n      </div>\n      <div>\n        <label>month: </label>\n        {{projectMetric.month}}\n      </div>\n      <div>\n        <label>project: </label>\n        {{projectMetric.project.name}}\n      </div>\n      <div>\n        <label>Members: </label>\n        <div *ngFor=\"let memberSummary of projectMetric.membersSummary\">\n          <div>\n            <label>member name: </label>\n            {{memberSummary.member.name}}\n          </div>\n        </div>\n      </div>\n    </div>\n    <metric-chart></metric-chart>\n  "
        }), 
        __metadata('design:paramtypes', [project_metric_service_1.ProjectMetricService])
    ], ProjectMetricDetailComponent);
    return ProjectMetricDetailComponent;
}());
exports.ProjectMetricDetailComponent = ProjectMetricDetailComponent;
//# sourceMappingURL=project-metric-detail.component.js.map