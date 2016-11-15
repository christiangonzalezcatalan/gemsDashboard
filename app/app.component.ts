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

    @ViewChild(ProjectMetricDetailComponent)
    private detailComponent: ProjectMetricDetailComponent;

    /*@ViewChild(MetricChartComponent)
    private metricChartComponent: MetricChartComponent;*/

    constructor(private projectMetricService: ProjectMetricService, 
                private projectService: ProjectService) { }

    getProjectMetrics(): void {
        this.projectMetricService.getProjectMetrics('57cc59368acec62bf2f7d7ed').subscribe(
                     metrics => this.metrics = metrics,
                     error =>  this.errorMessage = <any>error);
    }

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
        this.getProjectMetrics();
        this.getProjects();
    }

    onSelect(metric: ProjectMetric): void {
        this.selectedMetric = metric;
    }

    onSelectProject(project: Project): void {
        console.log(project);
        this.detailComponent.getProjectMetrics(project.id)
        //this.metricChartComponent.cargarData()
        this.selectedProject = project;
    }
}
