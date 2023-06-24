import { Injectable } from '@angular/core';
import { SearchEvent, PageResource } from '@ocp/ng-open-cargo-web';
import { Observable, of } from 'rxjs';
import { OcpHttpService } from '@ocp/ng-core';
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { DirectionEnum,
         OutboundMilestoneEnum,
         CDMP_MONITORING_SERVICE_PATH } from 'app/app.const';
import { MonitoringSearchCriteria } from '../models/monitoring-search-criteria.model';
import { Consignment, EventTime, ConsignmentStatusCounts } from '../models/monitoring-search-result.model';
import { ConsignmentDetails } from '../models/monitoring-search-consignment-details.model';
import { MonitoringSearchDateFormattingUtil } from '../utils/monitoring-search-date-formatting.util';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { stat } from 'fs';

@Injectable()
export class MonitoringSearchService {
    private BASE_PATH: string = CDMP_MONITORING_SERVICE_PATH + '/consignments';
    private MAX_SEARCH_SIZE: number = 100;
    private statusCounts: ConsignmentStatusCounts;
    private cachedResource: PageResource<Consignment> = null;

    constructor(private http: OcpHttpService) {
    }

    public search(criteria: any, event: SearchEvent, isFreshNewSearch: boolean): Observable<PageResource<Consignment>> {
        // Apply caching if a fresh new search is not required
        const searchCriteria: MonitoringSearchCriteria = this.mapSearchCriteria(criteria);
        if (!isFreshNewSearch) {
            return of(this.applySearchOnCache(searchCriteria, event));
        }

        // Fetch from API
        let params = new HttpParams();
        params = params.set('size', this.MAX_SEARCH_SIZE.toString());
        return this.http.post(this.BASE_PATH + '/search', searchCriteria, {params})
            .pipe(
                map((response: any) => {
                    this.assembleResult(response._embedded.consignments);
                    this.statusCounts = response.consignmentStatusCounts;
                    this.cachedResource = {
                        elements: response._embedded.consignments,
                        page: response.page,
                        _links: response._links
                    };
                    return this.applySearchOnCache(searchCriteria, event);
                }));
    }

    public getShipmentById(shipmentId: number): Observable<ConsignmentDetails> {
        let params = new HttpParams();
        params = params.set('id', '' + shipmentId);
        return this.http.get(this.BASE_PATH + '/' + shipmentId, {params})
            .pipe(
                map((response: any) => {
                    return response;
                }));
    }

    public getStatusCounts(): Observable<ConsignmentStatusCounts> {
        return of(this.statusCounts);
    }

    public getProductCodes( event: any ): Observable<string[]> {
        const productCodes: string[] = [];
        this.cachedResource.elements.forEach((element) => {
            if ( element.productCode &&
                !productCodes.includes(element.productCode) &&
                element.productCode.includes(event.query.toUpperCase())) {
                productCodes.push(element.productCode);
            }
        });
        productCodes.sort();
        return of (productCodes);
    }

    private mapSearchCriteria(criteria: any): MonitoringSearchCriteria {
        let discrepancyCodes: any[] = [];
        if (criteria && criteria.msgDiscrepancies) {
            discrepancyCodes = [...criteria.msgDiscrepancies];
        }
        if (criteria && criteria.opDiscrepancies) {
            discrepancyCodes = [...discrepancyCodes, ...criteria.opDiscrepancies];
        }

        return {
            carrierCode: criteria.carrier,
            stationCode: criteria.station ? criteria.station.code : '',
            milestoneCode: criteria.milestone,
            milestoneCodeIsLAT: criteria.milestone === OutboundMilestoneEnum.LAT,
            inboundMilestone: criteria.inbound === DirectionEnum.Inbound,
            plannedTimeFrom: criteria.intervalFrom.getMinutes() + criteria.intervalFrom.getHours() * 60,
            plannedTimeTo: criteria.intervalTo.getMinutes() + criteria.intervalTo.getHours() * 60,
            imminentTimeWindow: criteria.imminentTime.getMinutes() + criteria.imminentTime.getHours() * 60,
            discrepancyCodes,
            statusFilter: criteria.statusFilter,
            productCodeFilter: criteria.productCodeFilter
        };
    }

    private applySearchOnCache(criteria: MonitoringSearchCriteria, event: SearchEvent): PageResource<Consignment> {
        const filteredElemets: Consignment[] = [];
        const statusFilteredElements: Consignment[] = [];

        // 1. Initialize Resource
        const resource: PageResource<Consignment> = {
            elements: [],
            _links: null,
            page: {
                number: 0,
                totalPages: this.cachedResource.page.totalPages,
                size: 10,
                totalElements: this.cachedResource.page.totalElements
            }
        };

        // 2. Apply filtering
        this.cachedResource.elements.forEach((element) => {
            if (criteria.statusFilter.length > 0) {
                if (criteria.statusFilter.includes(element.status)) {
                    statusFilteredElements.push(element);
                }
            } else {
                statusFilteredElements.push(element);
            }
        });

        statusFilteredElements.forEach((element) => {
            if (criteria.productCodeFilter.length > 0) {
                if (element.productCode && element.productCode.includes(criteria.productCodeFilter.toUpperCase())) {
                    filteredElemets.push(element);
                }
            } else {
                filteredElemets.push(element);
            }
        });

        // 3. Sort filtered records (Note: Only STD/STA and milestone PET/AET sorting is supported)
        if (event.sortingContext && event.sortingContext.sortColumn && filteredElemets.length > 0) {
            filteredElemets.sort((a, b) => {
                const first = (event.sortingContext.sortOrder === 'ASC') ? a : b;
                const second = (event.sortingContext.sortOrder === 'ASC') ? b : a;
                const eventTimeFirst = this.getEventTimeValue(first, event.sortingContext.sortColumn);
                const eventTimeSecond = this.getEventTimeValue(second, event.sortingContext.sortColumn);
                if (event.sortingContext.sortColumn.includes('localTimezone')) {
                    return MonitoringSearchDateFormattingUtil.compareDates(eventTimeFirst.localTimezone, eventTimeSecond.localTimezone);
                }
                return MonitoringSearchDateFormattingUtil.compareDates(eventTimeFirst.utc, eventTimeSecond.utc);
            });
        }

        // 4. Lastly, Assemble Paged records
        if (event.pageSize) {
            resource.page.size = event.pageSize;
        }
        if (event.pageNumber) {
            if (event.pageNumber * resource.page.size < filteredElemets.length) {
                resource.page.number = event.pageNumber;
            } else {
                resource.page.number = 0;
            }
        }
        resource.page.totalElements = filteredElemets.length;
        resource.page.totalPages = Math.ceil(filteredElemets.length / resource.page.size);
        for (let i = resource.page.number * resource.page.size;
                 i < (resource.page.number + 1) * resource.page.size && i < filteredElemets.length;
                 ++i) {
                    resource.elements.push(filteredElemets[i]);
        }
        return resource;
    }

    private getEventTimeValue(record: any, sortColumn: string): EventTime {
        const et = record[sortColumn.replace(/\.(localTimezone|utc)/, '')];
        return et ? et : {localTimezone: '', utc: ''};
    }

    private mapSortingContext(sortingContext: any) {
        if (sortingContext.sortColumn.includes('PlannedEventTime')) {
            sortingContext.sortColumn = sortingContext.sortColumn.replace('lat', 'foh').substr(0, 3) + 'Pet' + this.mapSortingTimezone(sortingContext);
        } else if (sortingContext.sortColumn.includes('ActualEventTime')) {
            sortingContext.sortColumn = sortingContext.sortColumn.replace('lat', 'foh').substr(0, 3) + 'Aet' + this.mapSortingTimezone(sortingContext);
        } else if (sortingContext.sortColumn.includes('scheduledDeparture')) {
            sortingContext.sortColumn = 'std' + this.mapSortingTimezone(sortingContext);
        } else if (sortingContext.sortColumn.includes('scheduledArrival')) {
            sortingContext.sortColumn = 'sta' + this.mapSortingTimezone(sortingContext);
        }
    }

    private mapSortingTimezone(sortingContext: any): string {
        if (sortingContext.sortColumn.includes('utc')) {
            return 'Utc';
        }
        return 'Local';
    }
    private assembleResult(consignments: Consignment[]) {
        if (consignments) {
            consignments.forEach( (cons) => {
                cons.awb = cons.airlinePrefix + '-' + cons.airwaybillSerial;
                cons.flight = cons.carrier ? cons.carrier.code + cons.transportNumber : cons.transportNumber;
                if (cons.totalWeight) {
                    cons.totalWeight.display = cons.totalWeight.amount + ' ' + cons.totalWeight.unit;
                }
                cons.scheduledArrival = this.formatEventTime(cons.scheduledArrival);
                cons.scheduledDeparture = this.formatEventTime(cons.scheduledDeparture);
                for (const m of cons.milestones) {
                    switch (m.code) {
                        case 'FWB':
                            cons.fwbPlannedEventTime = this.formatEventTime(m.plannedEventTime);
                            cons.fwbActualEventTime = this.formatEventTime(m.actualEventTime);
                            break;
                        case 'FOH':
                            cons.latPlannedEventTime = this.formatEventTime(m.plannedEventTime);
                            cons.latActualEventTime = this.formatEventTime(m.actualEventTime);
                            break;
                        case 'RCS':
                            cons.rcsPlannedEventTime = this.formatEventTime(m.plannedEventTime);
                            cons.rcsActualEventTime = this.formatEventTime(m.actualEventTime);
                            break;
                        case 'DEP':
                            cons.depPlannedEventTime = this.formatEventTime(m.plannedEventTime);
                            cons.depActualEventTime = this.formatEventTime(m.actualEventTime);
                            break;
                        case 'ARR':
                            cons.arrPlannedEventTime = this.formatEventTime(m.plannedEventTime);
                            cons.arrActualEventTime = this.formatEventTime(m.actualEventTime);
                            break;
                        case 'RCF':
                            cons.rcfPlannedEventTime = this.formatEventTime(m.plannedEventTime);
                            cons.rcfActualEventTime = this.formatEventTime(m.actualEventTime);
                            break;
                        case 'NFD':
                            cons.nfdPlannedEventTime = this.formatEventTime(m.plannedEventTime);
                            cons.nfdActualEventTime = this.formatEventTime(m.actualEventTime);
                            break;
                        case 'DLV':
                            cons.dlvPlannedEventTime = this.formatEventTime(m.plannedEventTime);
                            cons.dlvActualEventTime = this.formatEventTime(m.actualEventTime);
                            break;
                    }
                }
            });
        }
    }

    private formatEventTime(et: EventTime): EventTime {
        return {
            localTimezone: et ? MonitoringSearchDateFormattingUtil.getDisplayDate(et.localTimezone) : '',
            utc: et ? MonitoringSearchDateFormattingUtil.getDisplayDate(et.utc) : ''
        };
    }
}
