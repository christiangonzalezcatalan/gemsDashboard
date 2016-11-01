import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { ProjectMetric } from './project-metric';
import { Project } from './project';
import { ProjectMetricService } from './project-metric.service';
import { ProjectService } from './project.service';
import { ProjectMetricDetailComponent } from './project-metric-detail.component';
import './rxjs-operator';

@Component({
  selector: 'my-app',
  template:  `
    <h1>{{title}}</h1>
    <h2>Proyectos</h2>
    <ul class="projects">
      <li *ngFor="let project of projects"
        [class.selected]="project === selectedProject"
        (click)="onSelectProject(project)">
        <span class="badge">{{project.id}}</span> {{project.name}}
      </li>
    </ul>
    <h2>Métricas</h2>
    <ul class="metrics">
      <li *ngFor="let metric of metrics"
        [class.selected]="metric === selectedMetric"
        (click)="onSelect(metric)">
        <span class="badge">{{metric.id}}</span> {{metric.name}}
      </li>
    </ul>
    <project-metric-detail></project-metric-detail>
`,
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
        this.selectedProject = project;
    }
}
