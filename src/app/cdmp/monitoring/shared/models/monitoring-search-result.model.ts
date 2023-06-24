export interface EventTime {
    localTimezone: string;
    utc: string;
}

export interface Milestone {
    code: string;
    actualEventTime: EventTime;
    plannedEventTime: EventTime;
    milestoneCompleted?: boolean;
    operationSuccess?: boolean;
    discrepancyCount?: number;
}

export interface Carrier {
    code: string;
}

export interface Weight {
    amount: number;
    unit: string;
    display?: string;
}

export interface Volume {
    amount: number;
    unit: string;
}

export interface Consignment {
    id: number;
    routeMapId: number;
    airlinePrefix: string;
    airwaybillSerial: string;
    awb: string;
    carrier: Carrier;
    transportNumber: string;
    flight: string;
    status: string;
    totalPieces: number;
    totalWeight: Weight;
    productCode: string;
    originCode: string;
    destinationCode: string;
    scheduledArrival: EventTime;
    scheduledDeparture: EventTime;
    segmentDestinationCode: string;
    segmentOriginCode: string;
    discrepancies: string[];
    fwbActualEventTime: EventTime;
    fwbPlannedEventTime: EventTime;
    latActualEventTime: EventTime;
    latPlannedEventTime: EventTime;
    rcsActualEventTime: EventTime;
    rcsPlannedEventTime: EventTime;
    depActualEventTime: EventTime;
    depPlannedEventTime: EventTime;
    arrActualEventTime: EventTime;
    arrPlannedEventTime: EventTime;
    rcfActualEventTime: EventTime;
    rcfPlannedEventTime: EventTime;
    nfdActualEventTime: EventTime;
    nfdPlannedEventTime: EventTime;
    dlvActualEventTime: EventTime;
    dlvPlannedEventTime: EventTime;
    milestones: Milestone[];
}

export interface ConsignmentStatusCounts {
    failing: number;
    imminent: number;
    ok: number;
}
