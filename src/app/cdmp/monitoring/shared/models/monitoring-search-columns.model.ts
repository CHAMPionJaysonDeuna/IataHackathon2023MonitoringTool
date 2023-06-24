import { SearchColumn } from '@ocp/ng-open-cargo-web';

export const COLUMNS: SearchColumn[] = [
    {
        field: 'status',
        headerKey: 'cdmp-app.monitoring.status',
        component: 'MonitoringSearchTableCellStatusComponent',
        hidden: false,
        cssClass: 'ocp-fixed-col-50'
    },
    {
        field: 'flight',
        headerKey: 'cdmp-app.monitoring.flight',
        hidden: false,
        cssClass: 'ocp-fixed-col-100'
    },
    {
        field: 'scheduledDeparture.localTimezone',
        headerKey: 'cdmp-app.monitoring.std',
        hidden: false,
        sortable: true,
        cssClass: 'ocp-fixed-col-105'
    },
    {
        field: 'scheduledArrival.localTimezone',
        headerKey: 'cdmp-app.monitoring.sta',
        hidden: false,
        sortable: true,
        cssClass: 'ocp-fixed-col-105'
    },
    {
        field: 'segmentOriginCode',
        headerKey: 'cdmp-app.monitoring.departure',
        hidden: true,
        cssClass: 'ocp-fixed-col-80'
    },
    {
        field: 'segmentDestinationCode',
        headerKey: 'cdmp-app.monitoring.arrival',
        hidden: true,
        cssClass: 'ocp-fixed-col-80'
    },
    {
        field: 'awb',
        headerKey: 'cdmp-app.monitoring.awb',
        hidden: false,
        cssClass: 'ocp-fixed-col-90'
    },
    {
        field: '',
        headerKey: 'cdmp-app.monitoring.view',
        component: 'MonitoringSearchTableCellViewComponent',
        hidden: false,
        cssClass: 'ocp-fixed-col-35'
    },
    {
        field: 'originCode',
        headerKey: 'cdmp-app.monitoring.origin',
        hidden: false,
        cssClass: 'ocp-fixed-col-70'
    },
    {
        field: 'destinationCode',
        headerKey: 'cdmp-app.monitoring.destination',
        hidden: false,
        cssClass: 'ocp-fixed-col-80'
    },
    {
        field: 'totalPieces',
        headerKey: 'cdmp-app.monitoring.pieces',
        hidden: true,
        cssClass: 'ocp-fixed-col-70'
    },
    {
        field: 'totalWeight.display',
        headerKey: 'cdmp-app.monitoring.weight',
        hidden: true,
        cssClass: 'ocp-fixed-col-100'
    },
    {
        field: 'productCode',
        headerKey: 'cdmp-app.monitoring.product',
        hidden: false,
        filterComponent: 'ProductColumnFilterComponent',
        filterControl: 'productCodeFilter',
        cssClass: 'ocp-fixed-col-100'
    },
    {
        field: 'fwbPlannedEventTime.localTimezone',
        headerKey: 'cdmp-app.monitoring.fwb-pet',
        hidden: true,
        sortable: true,
        cssClass: 'ocp-fixed-col-105'
    },
    {
        field: 'fwbActualEventTime.localTimezone',
        headerKey: 'cdmp-app.monitoring.fwb-aet',
        hidden: true,
        sortable: true,
        cssClass: 'ocp-fixed-col-105'
    },
    {
        field: 'latPlannedEventTime.localTimezone',
        headerKey: 'cdmp-app.monitoring.lat-pet',
        hidden: true,
        sortable: true,
        cssClass: 'ocp-fixed-col-105'
    },
    {
        field: 'latActualEventTime.localTimezone',
        headerKey: 'cdmp-app.monitoring.lat-aet',
        hidden: true,
        sortable: true,
        cssClass: 'ocp-fixed-col-105'
    },
    {
        field: 'rcsPlannedEventTime.localTimezone',
        headerKey: 'cdmp-app.monitoring.rcs-pet',
        hidden: true,
        sortable: true,
        cssClass: 'ocp-fixed-col-105'
    },
    {
        field: 'rcsActualEventTime.localTimezone',
        headerKey: 'cdmp-app.monitoring.rcs-aet',
        hidden: true,
        sortable: true,
        cssClass: 'ocp-fixed-col-105'
    },
    {
        field: 'depPlannedEventTime.localTimezone',
        headerKey: 'cdmp-app.monitoring.dep-pet',
        hidden: true,
        sortable: true,
        cssClass: 'ocp-fixed-col-105'
    },
    {
        field: 'depActualEventTime.localTimezone',
        headerKey: 'cdmp-app.monitoring.dep-aet',
        hidden: true,
        sortable: true,
        cssClass: 'ocp-fixed-col-105'
    },
    {
        field: 'arrPlannedEventTime.localTimezone',
        headerKey: 'cdmp-app.monitoring.arr-pet',
        hidden: true,
        sortable: true,
        cssClass: 'ocp-fixed-col-105'
    },
    {
        field: 'arrActualEventTime.localTimezone',
        headerKey: 'cdmp-app.monitoring.arr-aet',
        hidden: true,
        sortable: true,
        cssClass: 'ocp-fixed-col-105'
    },
    {
        field: 'rcfPlannedEventTime.localTimezone',
        headerKey: 'cdmp-app.monitoring.rcf-pet',
        hidden: true,
        sortable: true,
        cssClass: 'ocp-fixed-col-105'
    },
    {
        field: 'rcfActualEventTime.localTimezone',
        headerKey: 'cdmp-app.monitoring.rcf-aet',
        hidden: true,
        sortable: true,
        cssClass: 'ocp-fixed-col-105'
    },
    {
        field: 'nfdPlannedEventTime.localTimezone',
        headerKey: 'cdmp-app.monitoring.nfd-pet',
        hidden: false,
        sortable: true,
        cssClass: 'ocp-fixed-col-105'
    },
    {
        field: 'nfdActualEventTime.localTimezone',
        headerKey: 'cdmp-app.monitoring.nfd-aet',
        hidden: false,
        sortable: true,
        cssClass: 'ocp-fixed-col-105'
    },
    {
        field: 'dlvPlannedEventTime.localTimezone',
        headerKey: 'cdmp-app.monitoring.dlv-pet',
        hidden: true,
        sortable: true,
        cssClass: 'ocp-fixed-col-105'
    },
    {
        field: 'dlvActualEventTime.localTimezone',
        headerKey: 'cdmp-app.monitoring.dlv-aet',
        hidden: true,
        sortable: true,
        cssClass: 'ocp-fixed-col-105'
    },
    {
        field: 'discrepancies',
        headerKey: 'cdmp-app.monitoring.discrepancy',
        component: 'MonitoringSearchTableCellDiscrepancyComponent',
        hidden: false,
        cssClass: 'ocp-fixed-col-300'
    }
];
