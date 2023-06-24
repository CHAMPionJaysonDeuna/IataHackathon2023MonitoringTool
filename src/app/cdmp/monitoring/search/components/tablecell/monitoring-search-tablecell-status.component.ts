import { Component } from '@angular/core';
import { SearchScreenCell } from '@ocp/ng-open-cargo-web';

@Component({
    selector: 'monitoring-search-tablecell-status',
    styleUrls: ['./monitoring-search-tablecell.component.scss'],
    template: `
        <div (mouseenter)="statusArrToolTip.show($event)" (mouseleave)="statusArrToolTip.hide()">
            <i *ngIf="status === 'FAILING'" class="pi pi-times-circle icon-layout size-icon error-icon"></i>
            <i *ngIf="status === 'IMMINENT'" class="pi pi-exclamation-triangle icon-layout size-icon warning-icon"></i>
            <i *ngIf="status === 'OK'" class="pi pi-check-square icon-layout size-icon ok-icon"></i>
            <p-overlayPanel #statusArrToolTip [showCloseIcon]="false" [dismissable]="true" appendTo="body">
                <div>{{status}}</div>
            </p-overlayPanel>
        </div>
    `})
export class MonitoringSearchTableCellStatusComponent implements SearchScreenCell {
    public id: string;
    public status: string;

    public setContext(context: any): void {
        this.id = context.id;
        this.status = context.status;
    }
}
