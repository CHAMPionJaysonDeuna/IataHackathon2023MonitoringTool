export interface MonitoringSearchCriteria {
    carrierCode: string;
    discrepancyCodes: string[];
    imminentTimeWindow: number;
    inboundMilestone: boolean;
    milestoneCode: string;
    milestoneCodeIsLAT: boolean;
    plannedTimeFrom: number;
    plannedTimeTo: number;
    stationCode: number;
    statusFilter: string[];
    productCodeFilter: string;
}
