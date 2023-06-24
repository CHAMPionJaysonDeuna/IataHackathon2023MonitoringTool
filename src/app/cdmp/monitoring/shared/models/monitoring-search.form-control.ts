import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import moment from 'moment';
import { OCPValidators, LocationService, SessionStorageService } from '@ocp/ng-core';
import { DirectionEnum, InboundMilestoneEnum, TimezoneEnum } from '../../../../app.const';

export class MonitoringSearchForm {

    public formGroup: FormGroup;

    constructor(private locationService: LocationService, private sessionStorage: SessionStorageService) {
        const adjustedFrom = new Date();
        const adjustedTo = new Date();
        const imminentTime = new Date();
        adjustedFrom.setHours(6);
        adjustedFrom.setMinutes(0);
        adjustedTo.setHours(6);
        adjustedTo.setMinutes(0);
        imminentTime.setHours(0);
        imminentTime.setMinutes(30);

        this.formGroup = new FormGroup({
            station: new FormControl(this.sessionStorage.station, [Validators.required], [OCPValidators.autocompleteMustExistCheck(this.locationService)]),
            carrier: new FormControl(this.sessionStorage.customer.toUpperCase(), []),
            direction: new FormControl(DirectionEnum.Inbound, []),
            milestone: new FormControl(InboundMilestoneEnum.NFD, Validators.required),

            timezone: new FormControl(TimezoneEnum.Local, []),
            intervalFrom: new FormControl(adjustedFrom, [Validators.required]),
            intervalTo: new FormControl(adjustedTo, [Validators.required]),

            imminentTime: new FormControl(imminentTime, [Validators.required]),
            refreshRate: new FormControl(undefined, []),

            opDiscrepancies: new FormControl(undefined, []),
            msgDiscrepancies: new FormControl(undefined, []),

            // Filters
            statusFilter: new FormControl([]),
            productCodeFilter: new FormControl()
        });
    }

    private validateExceedPeriod: ValidatorFn = (fg: FormGroup) => {
        const from = fg.get('intervalFrom').value;
        const until = fg.get('intervalTo').value;
        if (from && until) {
            const fromDate = moment(from);
            const untilDate = moment(until);
            const scopePeriod = fromDate.add(2, 'day');
            // Time difference should be 48 hours at most
            if (untilDate.format('YYYY-MM-DD') !== scopePeriod.format('YYYY-MM-DD') && untilDate.isAfter(scopePeriod)) {
                return { validateExceedPeriod: true };
            }
        }
        return null;
    }

    private validateFromToDate: ValidatorFn = (fg: FormGroup) => {
        const from = fg.get('intervalFrom').value;
        const until = fg.get('intervalTo').value;
        if (from && until) {
            const fromDate = moment(from);
            const untilDate = moment(until);
            // From should be before To
            if (fromDate.format('YYYY-MM-DD') !== untilDate.format('YYYY-MM-DD') && fromDate.isAfter(untilDate)) {
                return { validateFromUntilDate: true };
            }
        }
        return null;
    }
}
