import { Weight, Volume, Carrier, Milestone, EventTime } from './monitoring-search-result.model';
import { ShipmentStatusEvents } from 'app/cdmp/shared/one-record/model/shipment-event.model';

export interface Segment {
    leg: number;
    carrier: Carrier;
    transportNumber: string;
    originCode: string;
    destinationCode: string;
    scheduledArrival: string;
    scheduledDeparture: string;
    pieces: number;
    milestones: Milestone[];
}

export interface RouteMap {
    id: number;
    segments: Segment[];
}

export interface Discrepancy {
    carrier: Carrier;
    transportNumber: string;
    milestoneCode: string;
    stationCode: string;
    discrepancyReason: string;
    raisedTime: EventTime;
}

export interface ConsignmentDetails {
    id: number;
    routeMapId: number;
    historyCount: number;
    airlinePrefix: string;
    airwaybillSerial: string;
    awb: string;
    totalPieces: number;
    totalWeight: Weight;
    totalVolume: Volume;
    originCode: string;
    destinationCode: string;
    routeMap: RouteMap;
    discrepancies: Discrepancy[];
    statusEvents: ShipmentStatusEvents[];
}
