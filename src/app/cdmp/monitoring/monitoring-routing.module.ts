import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MonitoringSearchComponent } from './search/components/monitoring-search.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MonitoringSearchComponent
      }
    ]) ],
  exports: [ RouterModule ]
})
export class MonitoringRoutingModule { }
