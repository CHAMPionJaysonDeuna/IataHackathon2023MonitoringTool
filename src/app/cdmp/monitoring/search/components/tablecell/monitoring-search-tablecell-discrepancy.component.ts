import { Component } from '@angular/core';
import { SearchScreenCell } from '@ocp/ng-open-cargo-web';

@Component({
    selector: 'monitoring-search-tablecell-discrepancy',
    styleUrls: ['./monitoring-search-tablecell.component.scss'],
    template: `
        <span (mouseenter)="statusArrToolTip.show($event)" (mouseleave)="statusArrToolTip.hide()">
            <div *ngIf="discrepancies.length > 1">
                <span class="cellAlignLeft">{{discrepancies[0]}}</span>
                <span class="cellAlignRight">...</span>
            </div>
            <div *ngIf="discrepancies.length === 1">
                <span class="cellAlignLeft">{{discrepancies[0]}}</span>
            </div>
            <p-overlayPanel #statusArrToolTip [showCloseIcon]="false" [dismissable]="true" appendTo="body">
                <div>{{discrepancies}}</div>
            </p-overlayPanel>
        </span>
    `})
export class MonitoringSearchTableCellDiscrepancyComponent implements SearchScreenCell {
    public id: string;
    public discrepancies: string[];

    public setContext(context: any): void {
        this.id = context.id;
        this.discrepancies = context.discrepancies;
    }
}
