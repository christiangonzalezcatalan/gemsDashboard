import { Injectable } from '@angular/core';
import { Project } from './project';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class ProjectService {
    private projectConfigMetricsUrl = 'http://localhost:8080/projects?toolName=Redmine&processName=NotAssignedWorkMetric';

    constructor(private http: Http) { }

    /*getProjectForMetrics(): Observable<Project[]> {
        return this.http.get(this.projectConfigMetricsUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }*/

    getProjectForMetrics (): Promise<Project[]> {
        return this.http.get(this.projectConfigMetricsUrl)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);
    }

    /*private fromJSONArray(array: Array<Object>): ProjectMetric[] {
        return array.map(obj => new ProjectMetric(obj['id'], obj['name']));
    }*/

    

    private extractData(res: Response) {
        let body = res.json();
        return body as Project[];
    }

    /*private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }*/

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    }
}