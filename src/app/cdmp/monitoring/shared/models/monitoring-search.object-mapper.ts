import { toDateFromString } from '@ocp/ng-open-cargo-web';

export const fromCdmpSearchCriteriaToCdmpSearchForm = {
    station: 'station',
    carrier:  'carrier',
    direction:  'direction',
    milestone:  'milestone',
    timezone:  'timezone',
    intervalFrom: {key: 'intervalFrom', transform: toDateFromString},
    intervalTo: {key: 'intervalTo', transform: toDateFromString},
    imminentTime: {key: 'imminentTime', transform: toDateFromString},
    refreshRate:  'refreshRate',
    opDiscrepancies:  'opDiscrepancies',
    msgDiscrepancies:  'msgDiscrepancies',
    statusFilter:  'statusFilter'

};
