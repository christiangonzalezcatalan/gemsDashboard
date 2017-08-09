import { ViewChild } from '@angular/core';
import { Component, Input, OnDestroy, OnInit  } from '@angular/core';
import { ProjectMetric } from './project-metric';
import { ProjectMetricService } from './project-metric.service';
import { MetricChartComponent } from './metric-chart.component';
import { MemberSummary } from './member-summary';
import './rxjs-operator';

@Component({
    selector: 'project-metric-detail',
    template: `
      <div *ngFor="let projectMetric of projectMetrics">
        <h3>{{projectMetric.name}}</h3>
        <div><label>id: </label>{{projectMetric.id}}</div>
        <div>
          <label>name: </label>
          {{projectMetric.name}}
        </div>
        <div>
          <label>month: </label>
          {{projectMetric.month + 1}}
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
              {{memberSummary.member.name}}: {{memberSummary.metricData.otherProjectHours}}
            </div>
          </div>
        </div>
      </div>
      <div class="circles">
        <div class="circle horasTrabajadas">
            <div class="hrs">{{horasTrabajadas}}</div>
            <div class="txt">Horas asignadas al proyecto trabajadas</div>
        </div>
        <div class="circle horasOtrosProyectos">
            <div class="hrs">{{horasOtrosProyectos}}</div>
            <div class="txt">Horas trabajadas en otros proyectos asignados</div>
        </div>
        <div class="circle horasNoAsignadasOtrosProyectos">
            <div class="hrs">{{horasOtrosProyectosNoAsignados}}</div>
            <div class="txt">Horas trabajadas en otros proyectos no asignados</div>
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
    horasTrabajadas: number = 0;
    horasOtrosProyectos: number = 0;
    horasOtrosProyectosNoAsignados: number = 0;

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

    private getHours() {  
        this.horasOtrosProyectosNoAsignados = 0;
        this.horasOtrosProyectos = 0;
        this.horasTrabajadas = 0;

        for (let projectMetric of this.projectMetrics) {
            for (let detail of projectMetric.details) {
                this.horasOtrosProyectosNoAsignados += detail.metricData.otherProjectNotPlannedHours || 0;
                this.horasOtrosProyectos += detail.metricData.otherProjectHours || 0;
                this.horasTrabajadas += detail.metricData.workedHours || 0;
            }
        }
    }

    private getMetricsFromBB(projectId: string, month: number, year: number): void {
        this.projectMetricService.getProjectMetrics(projectId, month, year).subscribe(
            projectMetrics => {
                this.projectMetrics = projectMetrics; 
                this.getHours();
                this.metricChartComponent.cargarData(projectMetrics);
            },
            error =>  this.errorMessage = <any>error);
    }
}
