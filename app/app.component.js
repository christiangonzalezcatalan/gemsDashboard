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
var project_service_1 = require('./project.service');
var project_metric_detail_component_1 = require('./project-metric-detail.component');
//import { ChartsModule } from '@angular/ng2-charts';
require('./rxjs-operator');
var AppComponent = (function () {
    function AppComponent(projectMetricService, projectService) {
        this.projectMetricService = projectMetricService;
        this.projectService = projectService;
        this.title = 'Dashboard';
    }
    AppComponent.prototype.getProjectMetrics = function () {
        var _this = this;
        this.projectMetricService.getProjectMetrics('57cc59368acec62bf2f7d7ed').subscribe(function (metrics) { return _this.metrics = metrics; }, function (error) { return _this.errorMessage = error; });
    };
    AppComponent.prototype.getProjects = function () {
        var _this = this;
        /*this.projectService.getProjectForMetrics().subscribe(
                     metrics => this.metrics = metrics,
                     error =>  this.errorMessage = <any>error);*/
        this.projectService.getProjectForMetrics()
            .then(function (projects) { return _this.projects = projects; }, function (error) { return _this.errorMessage = error; });
    };
    AppComponent.prototype.ngOnInit = function () {
        this.getProjectMetrics();
        this.getProjects();
    };
    AppComponent.prototype.onSelect = function (metric) {
        this.selectedMetric = metric;
    };
    AppComponent.prototype.onSelectProject = function (project) {
        console.log(project);
        this.detailComponent.getProjectMetrics(project.id);
        this.selectedProject = project;
    };
    __decorate([
        core_1.ViewChild(project_metric_detail_component_1.ProjectMetricDetailComponent), 
        __metadata('design:type', project_metric_detail_component_1.ProjectMetricDetailComponent)
    ], AppComponent.prototype, "detailComponent", void 0);
    AppComponent = __decorate([
        core_2.Component({
            selector: 'my-app',
            template: "\n    <h1>{{title}}</h1>\n    <h2>Proyectos</h2>\n    <ul class=\"projects\">\n      <li *ngFor=\"let project of projects\"\n        [class.selected]=\"project === selectedProject\"\n        (click)=\"onSelectProject(project)\">\n        <span class=\"badge\">{{project.id}}</span> {{project.name}}\n      </li>\n    </ul>\n    <h2>M\u00E9tricas</h2>\n    <ul class=\"metrics\">\n      <li *ngFor=\"let metric of metrics\"\n        [class.selected]=\"metric === selectedMetric\"\n        (click)=\"onSelect(metric)\">\n        <span class=\"badge\">{{metric.id}}</span> {{metric.name}}\n      </li>\n    </ul>\n    <project-metric-detail></project-metric-detail>\n    <metric-chart></metric-chart>\n",
            providers: [project_metric_service_1.ProjectMetricService, project_service_1.ProjectService]
        }), 
        __metadata('design:paramtypes', [project_metric_service_1.ProjectMetricService, project_service_1.ProjectService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map