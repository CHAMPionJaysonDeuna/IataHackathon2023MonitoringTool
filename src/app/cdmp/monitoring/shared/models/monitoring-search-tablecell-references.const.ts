import { MonitoringSearchTableCellStatusComponent } from '../../search/components/tablecell/monitoring-search-tablecell-status.component';
import { MonitoringSearchTableCellDiscrepancyComponent } from '../../search/components/tablecell/monitoring-search-tablecell-discrepancy.component';
import { ProductColumnFilterComponent } from '../../search/components/column-filters/product-column-filter/product-column-filter.component';
import { MonitoringSearchTableCellViewComponent } from '../../search/components/tablecell/monitoring-search-tablecell-view.component';

export const MONITORING_SEARCH_TABLE_CELL_COMPONENTS: any[] = [
    MonitoringSearchTableCellStatusComponent,
    MonitoringSearchTableCellDiscrepancyComponent,
    MonitoringSearchTableCellViewComponent,
    ProductColumnFilterComponent
];

export const MONITORING_SEARCH_TABLE_CELL_COMPONENTS_REF: any[] = [
    {name: 'MonitoringSearchTableCellStatusComponent', component: MonitoringSearchTableCellStatusComponent},
    {name: 'MonitoringSearchTableCellDiscrepancyComponent', component: MonitoringSearchTableCellDiscrepancyComponent},
    {name: 'MonitoringSearchTableCellViewComponent', component: MonitoringSearchTableCellViewComponent},
    {name: 'ProductColumnFilterComponent', component: ProductColumnFilterComponent}
];
