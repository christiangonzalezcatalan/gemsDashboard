import { ViewChild } from '@angular/core';
import { Component, Input, OnDestroy, OnInit  } from '@angular/core';
import { ProjectMetric } from './project-metric';
import { ProjectMetricService } from './project-metric.service';
import { MetricChartComponent } from './metric-chart.component';
import './rxjs-operator';

@Component({
    selector: 'project-metric-detail',
    template: `
      <div *ngFor="let projectMetric of projectMetrics">
        <h2>{{projectMetric.name}} details!</h2>
        <div><label>id: </label>{{projectMetric.id}}</div>
        <div>
          <label>name: </label>
          {{projectMetric.name}}
        </div>
        <div>
          <label>month: </label>
          {{projectMetric.month}}
        </div>
        <div>
          <label>project: </label>
          {{projectMetric.project.name}}
        </div>
        <div>
          <label>Members: </label>
          <div *ngFor="let memberSummary of projectMetric.membersSummary">
            <div>
              <label>member name: </label>
              {{memberSummary.member.name}}
            </div>
          </div>
        </div>
      </div>
      <metric-chart></metric-chart>
    `
})

export class ProjectMetricDetailComponent implements OnDestroy {
    @ViewChild(MetricChartComponent)
    private metricChartComponent: MetricChartComponent;
    
    projectMetrics: ProjectMetric[];
    errorMessage: String; 
    intervalId: number = 0;
    seconds: number = 10;

    constructor(private projectMetricService: ProjectMetricService) { }
    ngOnDestroy() { 
        this.clearTimer(); 
    }

    private clearTimer() { 
        clearInterval(this.intervalId); 
    }

    start(projectId: string, month: number, year: number) { 
        this.clearTimer();
        this.getMetricsFromBB(projectId, month, year)
        this.intervalId = window.setInterval(() => {
            this.getMetricsFromBB(projectId, month, year)
        }, this.seconds * 1000);
    }

    stop()  {
        this.clearTimer();
    }

    getProjectMetrics(projectId: string, month: number, year: number): void {
        this.start(projectId, month, year);
    }

    private getMetricsFromBB(projectId: string, month: number, year: number): void {
        this.projectMetricService.getProjectMetrics(projectId, month, year).subscribe(
            projectMetrics => {
                this.projectMetrics = projectMetrics; 
                this.metricChartComponent.cargarData(projectMetrics)
            },
            error =>  this.errorMessage = <any>error);
    }
}
