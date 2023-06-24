import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';
import { ConsignmentStatusCounts } from 'app/cdmp/monitoring/shared/models/monitoring-search-result.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'consignment-status-counts',
    styleUrls: ['./consignment-status-counts.component.scss'],
    templateUrl: './consignment-status-counts.component.html'
})
export class ConsignmentStatusCountsComponent {
    @Input() public consignmentCounts: ConsignmentStatusCounts;
    @Output() public statusFilterChange: EventEmitter<string> = new EventEmitter<string>();
    public statusFilter: string;

    constructor(private translateService: TranslateService) {
    }

    public statusFilterClicked(status: any) {
        this.statusFilterChange.emit(status);
    }

    public displayOk(): string  {
        const count = this.consignmentCounts ? this.consignmentCounts.ok : 0;
        return this.displayShipment(count);
    }

    public displayImminent(): string  {
        const count = this.consignmentCounts ? this.consignmentCounts.imminent : 0;
        return this.displayShipment(count);
    }

    public displayFailing(): string  {
        const count = this.consignmentCounts ? this.consignmentCounts.failing : 0;
        return this.displayShipment(count);
    }

    private displayShipment(count: number): string {
        return (count > 1) ?
            count + ' ' + this.translateService.instant('cdmp-app.monitoring.shipments') :
            count + ' ' + this.translateService.instant('cdmp-app.monitoring.shipment');

    }
}
