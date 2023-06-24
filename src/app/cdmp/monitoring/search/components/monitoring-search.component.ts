import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MonitoringSearchForm } from '../../shared/models/monitoring-search.form-control';
import { Observable, of, forkJoin } from 'rxjs';
import {
    DropDownEntry,
    OcpAction,
    PageResource,
    SearchColumn,
    SearchEvent,
    SearchForm,
    SearchPageMode,
    SearchScreenComponent,
    SearchScreenConfiguration,
    Station
} from '@ocp/ng-open-cargo-web';
import { COLUMNS } from '../../shared/models/monitoring-search-columns.model';
import { SelectItem } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MonitoringSearchService } from '../../shared/services/monitoring-search.service';
import {
    DirectionEnum,
    InboundMilestoneEnum,
    MessagingDiscrepanciesEnum,
    OperationalDiscrepanciesEnum,
    OutboundMilestoneEnum,
    RefreshRatesEnum,
    TimezoneEnum
} from 'app/app.const';
import { NotificationService } from '@ocp/ng-core/notifications';
import { FormErrorsService, Location, LocationService, SessionStorageService, UserService } from '@ocp/ng-core';
import { finalize, tap } from 'rxjs/operators';
import { ConsignmentDetails } from '../../shared/models/monitoring-search-consignment-details.model';
import { Consignment, ConsignmentStatusCounts } from '../../shared/models/monitoring-search-result.model';
import { fromCdmpSearchCriteriaToCdmpSearchForm } from '../../shared/models/monitoring-search.object-mapper';
import { OneRecordAuthenticationService } from 'app/cdmp/shared/one-record/services/authentication.service';
import { OneRecordShipmentService } from 'app/cdmp/shared/one-record/services/shipment.service';

@Component({
    selector: 'monitoring-search',
    templateUrl: './monitoring-search.component.html'
})
export class MonitoringSearchComponent extends SearchForm implements OnInit, AfterViewInit {
    public form: MonitoringSearchForm = new MonitoringSearchForm(this.locationService, this.sessionStorage);
    public columns: SearchColumn[] = COLUMNS;
    public readonly HEADER_ACTIONS: OcpAction[] = [];
    public readonly DIRECTIONS: DropDownEntry[] = Object.keys(DirectionEnum).map((e) => {
        return {id: e, i18nKey: 'cdmp-app.monitoring.directions.' + e.toLowerCase()};
    });
    public readonly INBOUND_MILESTONES: DropDownEntry[] = Object.keys(InboundMilestoneEnum).map((e) => {
        return {id: e, i18nKey: 'cdmp-app.monitoring.milestones.' + e.toLowerCase()};
    });
    public readonly OUTBOUND_MILESTONES: DropDownEntry[] = Object.keys(OutboundMilestoneEnum).map((e) => {
        return {id: e, i18nKey: 'cdmp-app.monitoring.milestones.' + e.toLowerCase()};
    });
    public MILESTONES: DropDownEntry[] = this.INBOUND_MILESTONES;
    public readonly REFRESH_RATES: DropDownEntry[] = Object.keys(RefreshRatesEnum).map((e) => {
        return {id: e, i18nKey: 'cdmp-app.monitoring.refresh-rates.' + e.toLowerCase()};
    });
    public readonly TIMEZONES: DropDownEntry[] = Object.keys(TimezoneEnum).map((e) => {
        return {id: e, i18nKey: 'cdmp-app.monitoring.timezones.' + e.toLowerCase()};
    });
    public operationalDiscrepancies: SelectItem[] = Object.keys(OperationalDiscrepanciesEnum).map((e) => {
        return {label: this.translateService.instant('cdmp-app.monitoring.discrepancies.' + e.toLowerCase()), value: e};
    });
    public messagingDiscrepancies: SelectItem[] = Object.keys(MessagingDiscrepanciesEnum).map((e) => {
        return {label: this.translateService.instant('cdmp-app.monitoring.discrepancies.' + e.toLowerCase()), value: e};
    });
    public selectedMilestone: string = InboundMilestoneEnum.NFD;
    public selectedMessagingDiscrepancies: string[] = [];
    public selectedOperationalDiscrepancies: string[] = [];
    public availableStationsSuggestion: Location[];
    public searchScreenConfiguration: SearchScreenConfiguration;
    public consignmentDetails: ConsignmentDetails;
    public consignment: Consignment;
    public timezone: string = 'local';
    public consignmentCounts: ConsignmentStatusCounts;
    public hideStatusCounts: boolean = true;
    private isFirstLoad: boolean = false;
    private isFreshNewSearch: boolean = true;

    // CDMP-5194 OneLiner
    private prevSearchedMls: string = '';

    @ViewChild('searchScreen', {static: false})
    private searchScreen: SearchScreenComponent;

    constructor(private monitoringService: MonitoringSearchService,
                private translateService: TranslateService,
                private notificationService: NotificationService,
                private sessionStorage: SessionStorageService,
                private formErrorsService: FormErrorsService,
                public cdRef: ChangeDetectorRef,
                public userService: UserService,
                private locationService: LocationService,
                private elementRef: ElementRef,
                private oneRecordShipmentService: OneRecordShipmentService) {
        super();
        this.searchScreenConfiguration = this.createConfiguration();
    }

    public ngOnInit(): void {
        this.isFirstLoad = true;
        Object.keys(MessagingDiscrepanciesEnum).map((m) => {
            this.selectedMessagingDiscrepancies.push(m);
        });
        Object.keys(OperationalDiscrepanciesEnum).map((o) => {
            this.selectedOperationalDiscrepancies.push(o);
        });
        this.formErrorsService.register(this.form.formGroup);
    }

    public ngAfterViewInit() {
        const button = this.elementRef.nativeElement.querySelector('#searchButton');
        button.addEventListener('click', () => {
            this.isFreshNewSearch = true;
        });

        this.form.formGroup.controls['productCodeFilter'].valueChanges.subscribe((x) => {
            if (!this.isFirstLoad) {
                this.searchScreen.onSearch();
            }
        });
    }

    public search(event: SearchEvent): Observable<PageResource<any>> {
        let resource: Observable<PageResource<any>> = of(null);
        if (this.form.formGroup.pristine && this.isFirstLoad) {
            this.form.formGroup.controls['productCodeFilter'].setValue('');
            this.userService.getCurrentUser().subscribe((user) => {
                this.form.formGroup.controls['carrier'].setValue(user.customer.toUpperCase());
                this.form.formGroup.controls['station'].setValue(user.station);
                this.searchScreen.onSearch();
            });
        } else {
            if (this.form.formGroup.valid) {
                if (this.isFreshNewSearch) {
                    this.setMilestoneColumns();
                }
                resource = this.monitoringService.search(this.buildSearchCriteria(), event, this.isFreshNewSearch);
                this.hideStatusCounts = true;
                this.isFreshNewSearch = false;
            } else {
                this.notificationService.info(this.translateService.instant('message-title.error'), 'Validation errors on search input.');
                this.form.formGroup.controls[ 'station' ].updateValueAndValidity();
                this.form.formGroup.markAllAsTouched();
            }
        }
        return resource.pipe(tap(() => this.setGlobalIndicators(undefined)));
    }

    public buildSearchCriteria(): any {
        return this.form.formGroup.getRawValue();
    }

    public createConfiguration(): SearchScreenConfiguration {
        return {
            context: 'monitoring',
            columns: this.columns,
            activateSelectableColumn: true,
            enableBrowserNavigation: true,
            urlParametersToFormMapper: fromCdmpSearchCriteriaToCdmpSearchForm,
            enableRowSelection: true,
            enableColumnFilter: true,
            enableFirstRowAutoSelection: false,
            paginationMode: SearchPageMode.PAGINATION
        } as SearchScreenConfiguration;
    }

    public rowSelected(event: any) {
        if (event.data) {
            this.consignment = event.data;
            this.getShipmentById(event.data.id);
        }
    }

    public searchStation(event: any): void {
        this.locationService.getLocations(event.query).pipe(finalize(() =>
            this.cdRef.detectChanges())).subscribe((locations: Location[]) => {
            this.availableStationsSuggestion = locations;
        });
    }

    public onSelectStation(station: Station) {
        this.form.formGroup.controls[ 'station' ].patchValue(station.location);
    }

    public onDirectionChanged(event: any) {
        if (this.form.formGroup.controls[ 'direction' ].value === DirectionEnum.Outbound) {
            this.MILESTONES = this.OUTBOUND_MILESTONES;
            this.selectedMilestone = OutboundMilestoneEnum.DEP;
        } else {
            this.MILESTONES = this.INBOUND_MILESTONES;
            this.selectedMilestone = InboundMilestoneEnum.NFD;
        }
    }

    public onTimezoneChanged(event: any) {
        let pattern = /localTimezone/;
        let replacement = 'utc';
        if (this.form.formGroup.controls[ 'timezone' ].value === TimezoneEnum.Local) {
            pattern = /utc/;
            replacement = 'localTimezone';
        }
        this.columns.forEach((col) => {
            col.field = col.field.replace(pattern, replacement);
        });
        this.searchScreenConfiguration.columns = this.columns;
    }

    public getForm(): FormGroup {
        return this.form.formGroup;
    }

    public setGlobalIndicators(_event: any) {
        if (this.isFirstLoad) {
            this.isFirstLoad = false;
            return;
        }
        this.monitoringService.getStatusCounts().subscribe((res) => {
            this.consignmentCounts = res;
            this.hideStatusCounts = false;
        });
    }

    public statusFilterChange(event: any) {
        // Trigger search using the selected status filter
        this.form.formGroup.controls[ 'statusFilter' ].setValue([ event ]);
        this.searchScreen.onSearch();
    }

    private setMilestoneColumns() {
        const curSearchedMls = this.form.formGroup.controls[ 'milestone' ].value.toLowerCase();
        const selectedColumns: SearchColumn[] = [];
        this.columns.forEach((col) => {
            // Show only selected milestone's PET and AET, hide for other milestones
            if (col.field.includes('PlannedEventTime') || col.field.includes('ActualEventTime')) {
                // CDMP-5194 BEGIN
                if (this.prevSearchedMls === '') {
                    col.hidden = !col.field.startsWith(curSearchedMls);
                } else if (this.prevSearchedMls !== curSearchedMls) {
                    if (col.field.startsWith(this.prevSearchedMls)) {
                        col.hidden = true;
                    } else if (col.field.startsWith(curSearchedMls)) {
                        col.hidden = false;
                    }
                }
                // else retain visibility
                // CDMP-5194 END
            }
            if (!col.hidden) {
                selectedColumns.push(col);
            }
        });
        this.searchScreenConfiguration.columns = this.columns;
        if (this.searchScreen) {
            this.searchScreen.selectedColumns = selectedColumns;
        }
        // CDMP-5194 OneLiner
        this.prevSearchedMls = curSearchedMls;
    }

    private getShipmentById(shipmentId: number) {
        /*const result = this.monitoringService.getShipmentById(shipmentId);
        result.subscribe((details) => {
            this.consignmentDetails = details;
        });*/
        forkJoin([
            this.monitoringService.getShipmentById(shipmentId),
            this.oneRecordShipmentService.getShipmentEvents('shipment-3')
        ]).subscribe((details) => {
            this.consignmentDetails = details[0];
            this.consignmentDetails.statusEvents = details[1];
        });
    }
}
