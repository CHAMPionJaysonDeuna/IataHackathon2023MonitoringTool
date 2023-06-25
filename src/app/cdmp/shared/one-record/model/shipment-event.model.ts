export interface EventDate {
    _type: string;
    _value: string;
}

export interface ShipmentStatusEvents {
    eventCode: string;
    eventName: string;
    eventTimeType: string;
    eventDate: EventDate;
    creationDate: EventDate;
    actualEventDate: EventDate;
    plannedEventDate: EventDate;
    isD2D: boolean;
}
