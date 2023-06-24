import { Component, OnInit, ChangeDetectorRef, forwardRef } from '@angular/core';
import { AbstractOcpAutoComplete } from '@ocp/ng-open-cargo-web';
import { TableColumnFilter } from '@ocp/ng-open-cargo-web/shared/search-screen/models/table-column-filter.interface';
import { MonitoringSearchService } from 'app/cdmp/monitoring/shared/services/monitoring-search.service';
import { FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-column-filter',
  templateUrl: './product-column-filter.component.html',
  providers: [
    // tslint:disable-next-line:no-forward-ref
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ProductColumnFilterComponent), multi: true},
    // tslint:disable-next-line:no-forward-ref
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => ProductColumnFilterComponent), multi: true}
  ]
})
export class ProductColumnFilterComponent extends AbstractOcpAutoComplete<string> implements TableColumnFilter {

  public formControl2: FormControl;

  constructor(private monitoringSearchService: MonitoringSearchService, protected cdRef: ChangeDetectorRef) {
    super(cdRef);
  }

  public doSearch(input: any) {
    // do nothing
  }

  public setContext(form: FormControl): void {
    this.formControl2 = form;
  }

  protected businessProcessQuery(event: any): Observable<string[]> {
    return this.monitoringSearchService.getProductCodes(event);
  }
}
