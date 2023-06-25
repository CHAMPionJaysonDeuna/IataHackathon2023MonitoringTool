import { Injectable } from '@angular/core';

import { OcpHttpService } from '@ocp/ng-core';
import { OneRecordAuthentication } from '../model/authentication.model';
import { PageResource } from '@ocp/ng-open-cargo-web';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { options } from 'app/app-routing.module';
import { ONE_RECORD_AUTH_TOKEN } from 'app/app.const';
import { ShipmentStatusEvents, EventDate } from '../model/shipment-event.model';
import { EventTime } from 'app/cdmp/monitoring/shared/models/monitoring-search-result.model';
import { MonitoringSearchDateFormattingUtil } from 'app/cdmp/monitoring/shared/utils/monitoring-search-date-formatting.util';

@Injectable()
export class OneRecordShipmentService {

    private LOGISTICS_URL: string = 'https://champ-1.one-record.lhind.dev/logistics-objects/';
    private IATA_CARGO_URL: string = 'https://onerecord.iata.org/ns/cargo';
    private D2D_CODES: string[] = ['PUP', 'REW', 'DEW', 'REH', 'DEH', 'RIH', 'DIH', 'RIW', 'OFD', 'TPN', 'POD'];

    constructor(private http: HttpClient) {
    }

    public getShipment(id: string): Observable<any> {

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${ONE_RECORD_AUTH_TOKEN}`
          })
          return this.http.get(this.LOGISTICS_URL + id, { headers: headers }).pipe(
            map((response: any) => {
                return this.debugShipmentResponse(response)
            })
          );
    }

    public getShipmentEvents(id: string): Observable<any> {

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${ONE_RECORD_AUTH_TOKEN}`
          })
          return this.http.get(this.LOGISTICS_URL + id + '/logistics-events', { headers: headers }).pipe(
            map((response: any) => {
                return this.debugEventResponse(response)
            })
          );
    }

    private debugShipmentResponse(response: any) {
        var obj: Object = JSON.parse(JSON.stringify(response).replace('@', '_').replace('https://onerecord.iata.org/ns/cargo#', ''));
        console.log('JAYS Shipment response: ' + obj);
    }

    private debugEventResponse(response: any): ShipmentStatusEvents[] {
        var reAt = /@/gi;
        var re = /https:\/\/onerecord.iata.org\/ns\/cargo#/gi; 
        var obj = JSON.parse(JSON.stringify(response).replace(reAt, '_').replace(re, ''));
        var events: ShipmentStatusEvents[] = [];
        for (let i = 0; i < obj._graph.length; ++i) {
            var steve:ShipmentStatusEvents = Object.assign({}, steve, obj._graph[i]);
            steve.actualEventDate = null;
            var preSteve = this.getStatusEvent(events, steve.eventCode);
            if (steve.eventTimeType == 'Actual') {
                steve.actualEventDate = this.formatEventTime(steve.eventDate);
                if (preSteve !== null) {
                    preSteve.actualEventDate = steve.actualEventDate;
                }
            } else if (steve.eventTimeType == 'Planned' || steve.eventTimeType == 'Predicted') {
                steve.plannedEventDate = this.formatEventTime(steve.eventDate);
                if (preSteve !== null) {
                    preSteve.actualEventDate = steve.actualEventDate;
                }
            }
            steve.isD2D = this.D2D_CODES.includes(steve.eventCode);
            if (preSteve == null && steve.eventCode !== 'BKD') {
                events.push(steve);
            }    
        }

        for (const ste of events) {
            if (ste.actualEventDate != null) {
                console.log('CHK: ' + JSON.stringify(ste));
            }
        }

        return events.sort((e1, e2) => { 
            if (e1.eventDate._value < e2.eventDate._value)
                return -1;
            return 1; 
        });
    }

    private getStatusEvent(events: ShipmentStatusEvents[], mls: string): ShipmentStatusEvents {
        for (const stev of events) {
            if (stev.eventCode == mls) {
                return stev;
            }
        }
        return null;
    }

    private log(message: string) {
        console.log(`AuthenticationService: ${message}`);
    }

    private formatEventTime(et: EventDate): EventDate {
        return {
            _type: et._type,
            _value: MonitoringSearchDateFormattingUtil.getDisplayDate(et._value)
        };
    }
}
