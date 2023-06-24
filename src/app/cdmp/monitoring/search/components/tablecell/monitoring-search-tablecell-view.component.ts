import { Component } from '@angular/core';
import { SearchScreenCell } from '@ocp/ng-open-cargo-web';

@Component({
    selector: 'monitoring-search-tablecell-view',
    styleUrls: ['./monitoring-search-tablecell.component.scss'],
    template: `
        <div (mouseenter)="statusArrToolTip.show($event)" (mouseleave)="statusArrToolTip.hide()">
            <a href="https://app.cumul.io/s/common-user-dashboard-dxuwnxwnf55i5ggc" target="_blank"><i class="pi pi-chart-bar icon-layout size-icon view-icon"></i></a>
            <p-overlayPanel #statusArrToolTip [showCloseIcon]="false" [dismissable]="true" appendTo="body">
                <div>dashboard view of this shipment</div>
            </p-overlayPanel>
        </div>
    `})
export class MonitoringSearchTableCellViewComponent implements SearchScreenCell {
    public id: string;
    public status: string;

    public setContext(context: any): void {
        this.id = context.id;
        this.status = context.status;
    }
}
