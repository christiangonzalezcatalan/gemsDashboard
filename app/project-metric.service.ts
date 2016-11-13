import { Injectable } from '@angular/core';
import { ProjectMetric } from './project-metric';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';

//import { METRICS } from './mock-project-metric'

@Injectable()
export class ProjectMetricService {
    //private projectMetricsUrl = 'http://localhost:8080/projectMetrics';  // URL to web api
    //private projectMetricsUrl = 'http://localhost:8080/projectMetrics?projectId=57cc59368acec62bf2f7d7ed&name=Horas trabajadas en otros proyectos&year=2016&month=9';

    constructor(private http: Http) { }

    getProjectMetrics(projectId: string): Observable<ProjectMetric[]> {
        let projectMetricsUrl = 'http://localhost:8080/projectMetrics?projectId=' + projectId + '&name=Horas trabajadas en otros proyectos&year=2016&month=10'
        //return this.http.get(this.projectMetricsUrl)
        console.log(projectMetricsUrl)

        return this.http.get(projectMetricsUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        body.forEach((pm) => {
            pm.details.forEach((detail) => {
                detail.fullDate = new Date(Date.parse(detail.date));
                detail.date = detail.fullDate.getDate();
                detail.month = detail.fullDate.getMonth();
            });
            pm.membersSummary.forEach((member) => {
                member.id = member.member.id;
                member.name = member.member.name;
                member.email = member.member.email;
            });
        });
        console.log(body);
        return body as ProjectMetric[];
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
