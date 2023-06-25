import { Component, Input, OnInit } from '@angular/core';
import { ConsignmentDetails, Segment } from 'app/cdmp/monitoring/shared/models/monitoring-search-consignment-details.model';
import { Consignment, EventTime } from 'app/cdmp/monitoring/shared/models/monitoring-search-result.model';
import { MonitoringSearchDateFormattingUtil } from 'app/cdmp/monitoring/shared/utils/monitoring-search-date-formatting.util';
import { TranslateService } from '@ngx-translate/core';
import { TimezoneEnum } from 'app/app.const';
import { ShipmentStatusEvents } from 'app/cdmp/shared/one-record/model/shipment-event.model';

declare const WebSetup: any;

@Component({
    selector: 'monitoring-search-consignment-details',
    styleUrls: ['./monitoring-search-consignment-details.component.scss'],
    templateUrl: './monitoring-search-consignment-details.component.html'
})
export class MonitoringSearchConsignmentDetailsComponent implements OnInit {
    @Input() public consignmentDetails: ConsignmentDetails;
    @Input() public consignment: Consignment;
    @Input() public timezone: TimezoneEnum;

    public readonly BASE_LOCATION_PATHNAME = WebSetup.bizUrlDomains + 'assets/images/';
    public airplaneBubble = this.BASE_LOCATION_PATHNAME + 'Airplane/airplane_grey_screen.png';
    public milestoneBubble = this.BASE_LOCATION_PATHNAME + 'MLS/MLS_COLOR_screen.png';

    public statusEvents: ShipmentStatusEvents[] = [];

    private readonly LANE_MILESTONES_ORIGIN = [
        'FWB', 'LAT', 'RCS'
    ];
    private readonly LANE_MILESTONES_DESTINATION = [
        'NFD', 'DLV'
    ];
    private laneSegment: Segment;
    private consignmentId: number;

    constructor(private translateService: TranslateService) {
    }

    public ngOnInit(): void {
        this.getLaneSegment();
        for (const st of this.consignmentDetails.statusEvents) {
            if (st.actualEventDate != null && !['DEP', 'ARR'].includes(st.eventCode)) {
                this.statusEvents.push(st);
            }
        }
    }

    public isMilestoneVisible(segment: Segment, index: number, mls: string): boolean {
        if (segment) {
            // lane milestones
            if (this.isLaneMilestone(mls)) {
                if (this.LANE_MILESTONES_ORIGIN.includes(mls)) {
                    return index === 1; // Note: invisible lane segment is @index=0
                } else if (this.LANE_MILESTONES_DESTINATION.includes(mls)) {
                    return index === this.consignmentDetails.routeMap.segments.length - 1;
                }
            }
            // non lane milestones
            for (const milestone of segment.milestones) {
                if (milestone.code === mls) {
                    return true;
                }
            }
        }
        return false;
    }

    public isLaneMilestone(mls: string): boolean {
        return this.LANE_MILESTONES_ORIGIN.includes(mls) ||
               this.LANE_MILESTONES_DESTINATION.includes(mls);
    }

    // object can be Segment or Discrepancy
    public getFlightNumber(object: any): string {
        let flt = '';
        if (object && object.carrier && object.carrier.code && object.transportNumber) {
                flt = object.carrier.code + object.transportNumber;
        }
        return flt;
    }

    public getMilestoneDisplayDate(segment: Segment, index: number, mls: string, isPlanned: boolean): string {
        // take from the lane segment if lane milestone
        if (this.isLaneMilestone(mls) && segment && segment.leg !== 0) {
            if (this.isMilestoneVisible(segment, index, mls)) {
                if (this.consignmentId !== this.consignmentDetails.id) {
                    this.getLaneSegment();
                }
                return this.getMilestoneDisplayDate(this.laneSegment, index, mls, isPlanned);
            } else {
                return '';
            }
        }

        if (segment) {
            for (const milestone of segment.milestones) {
                if (milestone.code === mls) {
                    if (isPlanned) {
                        const ret = MonitoringSearchDateFormattingUtil.getDisplayDate(milestone.plannedEventTime ?
                            (this.timezone === TimezoneEnum.UTC) ? milestone.plannedEventTime.utc : milestone.plannedEventTime.localTimezone : '');
                        return ret ? this.translateService.instant('cdmp-app.monitoring.details.planned-indicator') + ret : '';
                    } else {
                        const ret = MonitoringSearchDateFormattingUtil.getDisplayDate(milestone.actualEventTime ?
                            (this.timezone === TimezoneEnum.UTC) ? milestone.actualEventTime.utc : milestone.actualEventTime.localTimezone : '');
                        return ret ? this.translateService.instant('cdmp-app.monitoring.details.actual-indicator') + ret : '';
                    }
                }
            }
        }
        return '';
    }

    public getDisplayDate(input: EventTime): string {
        return MonitoringSearchDateFormattingUtil.getDisplayDate((this.timezone === TimezoneEnum.UTC) ? input.utc : input.localTimezone);
    }

    public getMilestoneImage(segment: Segment, mls: string): string {
        let useSegment = segment;

        // take from the lane segment if lane milestone
        if (this.isLaneMilestone(mls) && segment && segment.leg !== 0) {
            if (this.consignmentId !== this.consignmentDetails.id) {
                this.getLaneSegment();
            }
            useSegment = this.laneSegment;
        }

        if (useSegment) {
            for (const milestone of useSegment.milestones) {
                if (milestone.code === mls) {
                    const image = this.milestoneBubble.replace(/MLS/g, mls);
                    if (!milestone.operationSuccess || milestone.discrepancyCount > 0) {
                        return image.replace(/COLOR/, 'red');
                    }
                    return image.replace(/COLOR/, milestone.milestoneCompleted ? 'green' : 'blue');
                }
            }
        }
        return '';
    }

    public getD2dMilestoneDisplayDate(mls: string, isPlanned: boolean): string {
        const steve: ShipmentStatusEvents = this.getD2dMilestoneEvent(mls);
        if (this.getD2dMilestoneEvent(mls) == null) {
            return '';
        }
        var ret : string = null;
        if (isPlanned) {
            ret = steve.plannedEventDate ? steve.plannedEventDate._value : '';
            return ret ? this.translateService.instant('cdmp-app.monitoring.details.planned-indicator') + ret : '';
        }
        ret = steve.actualEventDate ? steve.actualEventDate._value : '';
        return ret ? this.translateService.instant('cdmp-app.monitoring.details.actual-indicator') + ret : '';
    }

    public getD2dMilestoneImage(mls: string): string {
        const image = this.milestoneBubble.replace(/MLS/g, mls);
        const steve = this.getD2dMilestoneEvent(mls);
        const color: string = image.replace(/COLOR/, steve == null ? 'blue' : (steve.actualEventDate ? 'green' : 'blue'));
        return color;
    }

    private getD2dMilestoneEvent(mls: string): ShipmentStatusEvents {
        for (const steve of this.consignmentDetails.statusEvents) {
            if (steve.eventCode == mls) {
                return steve;
            }
        }
        return null;
    }

    private getLaneSegment() {
        for (const segment of this.consignmentDetails.routeMap.segments) {
            if (segment.leg === 0) {
                this.laneSegment = segment;
            }
        }
        this.consignmentId = this.consignmentDetails.id;
    }
}
