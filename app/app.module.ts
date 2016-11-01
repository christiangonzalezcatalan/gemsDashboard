import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }  from './app.component';
import { ProjectMetricDetailComponent } from './project-metric-detail.component';

@NgModule({
    imports:      [
        BrowserModule,
        HttpModule/*,
        InMemoryWebApiModule.forRoot(InMemoryDataService)*/
    ],
    declarations: [
        AppComponent,
        ProjectMetricDetailComponent
    ],
    bootstrap:    [
        AppComponent
    ]
})
export class AppModule { }
