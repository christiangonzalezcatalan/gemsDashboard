import { Component, Input } from '@angular/core';
import { ProjectMetric } from './project-metric';
import { ProjectMetricService } from './project-metric.service';
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
  `
})
export class ProjectMetricDetailComponent {
    //
    
    //@Input()
    //metric: ProjectMetric;
    projectMetrics: ProjectMetric[];
    errorMessage: String;

    constructor(private projectMetricService: ProjectMetricService) { }

    getProjectMetrics(projectId: string): void {
        this.projectMetricService.getProjectMetrics(projectId).subscribe(
                     projectMetrics => this.projectMetrics = projectMetrics,
                     error =>  this.errorMessage = <any>error);
    }
}
