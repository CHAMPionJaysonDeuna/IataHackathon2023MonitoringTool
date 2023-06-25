export const CDMP_MONITORING_SERVICE_PATH = '/cdmp/monitoring/v1';
export const ONE_RECORD_AUTH_TOKEN =
'eyJhbGciOiJSUzI1NiIsImtpZCI6Ik1RZFRjMENlbHRlS0N2bkpVQm5RSWd2ckZySUVEbWtDM0FJVTJPUUd1VHMiLCJ0eXAiOiJKV1QifQ.eyJsb2dpc3RpY3NBZ2VudFVSSSI6Imh0dHBzOi8vY2hhbXAtMS5vbmUtcmVjb3JkLmxoaW5kLmRldi9sb2dpc3RpY3Mtb2JqZWN0cy85NzkwMzJiOCIsInRpZCI6ImI4YTc0NmE2LWM1NDAtNDNmNC05MmYzLTYxNTBhZDA1NzIxNSIsImF6cGFjciI6IjEiLCJzdWIiOiJlZGY5YWE2MC02OTFiLTQ2ZTQtOWM5Yi04MTdjMTNkNTIxNDciLCJhdWQiOiJjMmFiMGYzZC01NzRlLTRkMDctYTdiZC1jMzVkNGRjNTgyMWYiLCJvaWQiOiJlZGY5YWE2MC02OTFiLTQ2ZTQtOWM5Yi04MTdjMTNkNTIxNDciLCJ2ZXIiOiIyLjAiLCJhenAiOiJjMmFiMGYzZC01NzRlLTRkMDctYTdiZC1jMzVkNGRjNTgyMWYiLCJpYXQiOjE2ODc2NTYwMzksImV4cCI6MTY4NzY1OTYzOSwiaXNzIjoiaHR0cHM6Ly9hdXRoLm9uZS1yZWNvcmQubGhpbmQuZGV2L2I4YTc0NmE2LWM1NDAtNDNmNC05MmYzLTYxNTBhZDA1NzIxNS92Mi4wLyIsIm5iZiI6MTY4NzY1NjAzOX0.lRAiyOjkt4VhFFrM7ac-D8k-HY25fNUYHp24aINaHvkbG_hdmyZ3mGv6TzrW3X8J5d2m2cIJCnGZgkIoDKm65PRF3rT_Rr_xpaPZUt9SRjgX4CTtecz22PrD8yCIxcpMVd7My85YQL7nBEenhbJvaCi7cUC7-0Wxq8NUGpRgPH272H6TUfWKhv-PuRje_CQgsL62H_tlGHT7K48pFgNObYs5oewgi4EIlrU43OORDwW-wxhjnOjajwhK8PFLKSWrro9T6O4ferJJ2ZBOj7X-ZxxHjxx680EP2M0dDSlglklW2jBtzHRzveF_2EWcWqKDnd--Z7veim6sxPRA-51PAQ'
;

export enum TimezoneEnum {
    Local = 'Local',
    UTC = 'UTC'
}

export enum DaysEnum {
    Monday = 'Monday',
    Tuesday = 'Tuesday',
    Wednesday = 'Wednesday',
    Thursday = 'Thursday',
    Friday = 'Friday',
    Saturday = 'Saturday',
    Sunday = 'Sunday'
}

export enum DirectionEnum {
    Inbound = 'Inbound',
    Outbound = 'Outbound'
}

export enum InboundMilestoneEnum {
    ARR = 'ARR',
    RCF = 'RCF',
    NFD = 'NFD',
    DLV = 'DLV'
}

export enum OutboundMilestoneEnum {
    FWB = 'FWB',
    LAT = 'LAT',
    RCS = 'RCS',
    DEP = 'DEP'
}

export enum RefreshRatesEnum {
    M1 = '1 min',
    M5 = '5 mins',
    M15 = '15 mins',
    M30 = '30 mins',
    H1 = '1 hour'
}

export enum OperationalDiscrepanciesEnum {
    O001 = 'no event time',
    O002 = 'event time not actual',
    O003 = 'milestone failed - evented late',
    O004 = 'pieces mismatch',
    O005 = 'shipment not flown as planned',
    O006 = 'invalid event time',
    O007 = 'weight mismatch - > tolerance',
    O008 = 'volume mismatch - > tolerance',
    O009 = 'weight mismatch - < tolerance',
    O010 = 'volume mismatch - < tolerance',
    O011 = 'missed milestone - insufficient pieces reported',
    O012 = 'consignment delivery commitment failed',
    O100 = 'rebooked',
    O101 = 'DEP event time > 12h delayed',
    O102 = 'rebooked due to station mismatch',
    O201 = 'FOH not OK (total number of pcs incorrect at LAT)',
    O202 = 'no FWB received at LAT',
    O301 = 'NFD failed for RCF not complete'
}

export enum MessagingDiscrepanciesEnum {
    M001 = 'message received without route plan existing',
    M002 = 'message received in wrong order',
    M003 = 'milestone failed - message not received',
    M004 = 'origin/ destination mismatch',
    M005 = 'message received after grace period passed',
    M006 = 'message received more than 1 hour after event time',
    M008 = 'FWB Received after baseline route map'
}
