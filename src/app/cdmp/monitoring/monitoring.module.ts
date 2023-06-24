import { NgModule } from '@angular/core';

import { MonitoringRoutingModule } from './monitoring-routing.module';
import { MonitoringSearchModule } from './search/monitoring-search.module';

@NgModule({
    imports: [
        MonitoringSearchModule,
        MonitoringRoutingModule
    ]
})
export class MonitoringModule { }
