import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule } from '@angular/forms';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }  from './app.component';
import { ProjectMetricDetailComponent } from './project-metric-detail.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { MetricChartComponent } from './metric-chart.component';

@NgModule({
    imports:      [
        BrowserModule,
        ChartsModule,
        FormsModule,
        HttpModule/*,
        InMemoryWebApiModule.forRoot(InMemoryDataService)*/
    ],
    declarations: [
        AppComponent,
        ProjectMetricDetailComponent,
        MetricChartComponent
    ],
    bootstrap:    [
        AppComponent
    ]
})
export class AppModule { }
