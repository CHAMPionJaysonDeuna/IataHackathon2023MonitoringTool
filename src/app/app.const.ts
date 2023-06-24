export const CDMP_MONITORING_SERVICE_PATH = '/cdmp/monitoring/v1';
export const ONE_RECORD_AUTH_TOKEN =
'eyJhbGciOiJSUzI1NiIsImtpZCI6Ik1RZFRjMENlbHRlS0N2bkpVQm5RSWd2ckZySUVEbWtDM0FJVTJPUUd1VHMiLCJ0eXAiOiJKV1QifQ.eyJsb2dpc3RpY3NBZ2VudFVSSSI6Imh0dHBzOi8vY2hhbXAtMS5vbmUtcmVjb3JkLmxoaW5kLmRldi9sb2dpc3RpY3Mtb2JqZWN0cy85NzkwMzJiOCIsInRpZCI6ImI4YTc0NmE2LWM1NDAtNDNmNC05MmYzLTYxNTBhZDA1NzIxNSIsImF6cGFjciI6IjEiLCJzdWIiOiJlZGY5YWE2MC02OTFiLTQ2ZTQtOWM5Yi04MTdjMTNkNTIxNDciLCJhdWQiOiJjMmFiMGYzZC01NzRlLTRkMDctYTdiZC1jMzVkNGRjNTgyMWYiLCJvaWQiOiJlZGY5YWE2MC02OTFiLTQ2ZTQtOWM5Yi04MTdjMTNkNTIxNDciLCJ2ZXIiOiIyLjAiLCJhenAiOiJjMmFiMGYzZC01NzRlLTRkMDctYTdiZC1jMzVkNGRjNTgyMWYiLCJpYXQiOjE2ODc2MzU4OTEsImV4cCI6MTY4NzYzOTQ5MSwiaXNzIjoiaHR0cHM6Ly9hdXRoLm9uZS1yZWNvcmQubGhpbmQuZGV2L2I4YTc0NmE2LWM1NDAtNDNmNC05MmYzLTYxNTBhZDA1NzIxNS92Mi4wLyIsIm5iZiI6MTY4NzYzNTg5MX0.C6YSkOfxpNbhubgPBnJ-XH52LnwIk7epT3Zkv3e1GJK3VKD7tN8g_14W8GGrESFMm3GkKqxIvGo4N2cYV04WlOkiAsjIIK_lNlJjdl9KAHtFNH0JXrLdX0a1JljpoTZWe_1udwWk6SEEqF_Z85EoKdf9txIAvyscwyqesuJMVQrheAB2dU3IYixx7DzBugS_rBysJubS9-CCptM5DC36u_D9gY0bsDcH_OpgYintjuVEwwZPkcqQohczZBaPdfahhvMguW6fOiPVMMJosQGYQwfC0fTxTMr0i2VQwX00WjDxhkdk5u1g8LfKTH_uuoJDYvdRq1X7w1GIvg6cE9MI-g'
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
