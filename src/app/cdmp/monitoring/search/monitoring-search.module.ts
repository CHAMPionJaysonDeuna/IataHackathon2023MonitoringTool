import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { OcpHttpModule, LocationService, UserService } from '@ocp/ng-core';
import { NotificationModule } from '@ocp/ng-core/notifications';
import {
    ExpandableTabsModule,
    FormErrorsModule,
    HeaderModule,
    InputButtonPopupModule,
    OcpCalendarModule,
    OcpDirectivesModule,
    OcpDropdownModule,
    OcpPipesModule,
    SearchScreenModule,
    ExpandableCardContentModule, TABLE_CELL_MAPPING_TOKEN, StationAutoCompleteModule, OcpAutoCompleteModule
} from '@ocp/ng-open-cargo-web';
import { InputTextModule, SharedModule, OverlayPanelModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { MONITORING_SEARCH_TABLE_CELL_COMPONENTS, MONITORING_SEARCH_TABLE_CELL_COMPONENTS_REF } from '../shared/models/monitoring-search-tablecell-references.const';
import { MonitoringSearchComponent } from './components/monitoring-search.component';
import { MonitoringSearchService } from '../shared/services/monitoring-search.service';
import { MonitoringSearchConsignmentDetailsComponent } from './components/consignment-details/monitoring-search-consignment-details.component';
import { ConsignmentStatusCountsComponent } from './components/consignment-status-counts/consignment-status-counts.component';
import { ProductColumnFilterComponent } from './components/column-filters/product-column-filter/product-column-filter.component';
import { OneRecordAuthenticationService } from 'app/cdmp/shared/one-record/services/authentication.service';
import { OneRecordShipmentService } from 'app/cdmp/shared/one-record/services/shipment.service';

@NgModule({
    declarations: [
        MonitoringSearchComponent,
        MonitoringSearchConsignmentDetailsComponent,
        ConsignmentStatusCountsComponent,
        MONITORING_SEARCH_TABLE_CELL_COMPONENTS,
        ProductColumnFilterComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        HeaderModule,
        FormsModule,
        ReactiveFormsModule,
        ExpandableTabsModule,
        SearchScreenModule.forRoot(),
        InputTextModule,
        OcpCalendarModule,
        FormErrorsModule,
        OcpDropdownModule,
        MultiSelectModule,
        ButtonModule,
        OcpPipesModule,
        OcpDirectivesModule,
        ExpandableCardContentModule,
        HttpClientModule,
        NotificationModule,
        OcpHttpModule,
        InputButtonPopupModule,
        SharedModule,
        OverlayPanelModule,
        StationAutoCompleteModule,
        OcpAutoCompleteModule,
    ],
    entryComponents: [
        MONITORING_SEARCH_TABLE_CELL_COMPONENTS
    ],
    providers: [
        MonitoringSearchService,
        LocationService,
        UserService,
        OneRecordAuthenticationService,
        OneRecordShipmentService,
        {provide: TABLE_CELL_MAPPING_TOKEN, useValue: {components: [  ...MONITORING_SEARCH_TABLE_CELL_COMPONENTS_REF ]}, multi: true}
    ]
})
export class MonitoringSearchModule { }
