import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { ProjectMetric } from './project-metric';
import { Project } from './project';
import { ProjectMetricService } from './project-metric.service';
import { ProjectService } from './project.service';
import { ProjectMetricDetailComponent } from './project-metric-detail.component';
//import { MetricChartComponent } from './metric-chart';
//import { ChartsModule } from '@angular/ng2-charts';
import './rxjs-operator';

@Component({
  selector: 'my-app',
  template:  `
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
          <ul class="nav nav-sidebar">
            <li class="active"><a href="#">Proyectos <span class="sr-only">(current)</span></a></li>
            <li *ngFor="let project of projects"
                [class.selected]="project === selectedProject"
                (click)="onSelectProject(project)">
                <a href="#">{{project.name}}</a>
            </li>
          </ul>
        </div>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <label>Año</label>
          <select class="form-control" type="number" [(ngModel)]="selectedYear" (ngModelChange)="onYearSelected()">
            <option *ngFor="let year of years"
                [value]="year"
                [class.selected]="year === selectedYear">
                {{year}}</option>
          </select>
          <label>Mes</label>
          <select class="form-control" type="number" [(ngModel)]="selectedMonth" (ngModelChange)="onMonthSelected()">
            <option *ngFor="let month of months"
                [value]="month.num"
                [selected]="month.num === selectedMonth">
                {{month.name}}</option>
          </select>
          <project-metric-detail></project-metric-detail>
        </div>
      </div>
    </div>`,
    providers: [ProjectMetricService, ProjectService]
})
export class AppComponent {
    title = 'Dashboard';
    metrics: ProjectMetric[];
    projects: Project[];
    selectedProject: Project;
    selectedMetric: ProjectMetric;
    errorMessage: String;
    selectedMonth: number = 7;
    selectedYear: number = 2017;
    months: Array<Object> = [
      {num: 0, name: "Enero"},
      {num: 1, name: "Febrero"},
      {num: 2, name: "Marzo"},
      {num: 3, name: "Abril"},
      {num: 4, name: "Mayo"},
      {num: 5, name: "Junio"},
      {num: 6, name: "Julio"},
      {num: 7, name: "Agosto"},
      {num: 8, name: "Septiembre"},
      {num: 9, name: "Octubre"},
      {num: 10, name: "Noviembre"},
      {num: 11, name: "Diciembre"}
  ];
  years: Array<number> = [2017, 2016, 2015]

    @ViewChild(ProjectMetricDetailComponent)
    private detailComponent: ProjectMetricDetailComponent;

    /*@ViewChild(MetricChartComponent)
    private metricChartComponent: MetricChartComponent;*/

    constructor(private projectMetricService: ProjectMetricService, 
                private projectService: ProjectService) { }

    /*getProjectMetrics(): void {
        this.projectMetricService.getProjectMetrics('57cc59368acec62bf2f7d7ed').subscribe(
                     metrics => this.metrics = metrics,
                     error =>  this.errorMessage = <any>error);
    }*/

    getProjects(): void {
        /*this.projectService.getProjectForMetrics().subscribe(
                     metrics => this.metrics = metrics,
                     error =>  this.errorMessage = <any>error);*/
        this.projectService.getProjectForMetrics()
                   .then(
                     projects => this.projects = projects,
                     error =>  this.errorMessage = <any>error);
    }

    ngOnInit(): void {
        //this.getProjectMetrics();
        this.getProjects();
    }

    onSelect(metric: ProjectMetric): void {
        this.selectedMetric = metric;
    }

    onYearSelected() {
      console.log(this.selectedYear)
      this.detailComponent.getProjectMetrics(this.selectedProject.id, this.selectedMonth, this.selectedYear)
    }

    onMonthSelected() {
      console.log(this.selectedMonth)
      this.detailComponent.getProjectMetrics(this.selectedProject.id, this.selectedMonth, this.selectedYear)
    }

    onSelectProject(project: Project): void {
        console.log(this.selectedProject);
        console.log(project);
        this.detailComponent.getProjectMetrics(project.id, this.selectedMonth, this.selectedYear)
        //this.metricChartComponent.cargarData()
        this.selectedProject = project;
    }
}
