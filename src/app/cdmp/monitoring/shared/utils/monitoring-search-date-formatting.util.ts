import * as moment from 'moment';

export class MonitoringSearchDateFormattingUtil {
    public static getDisplayDate(input: string): string {
        if (input) {
            return moment(Date.parse(input)).utcOffset(input).format('DD MMM HH:mm');
        }
        return '';
    }
    public static compareDates(dt1: string, dt2: string): number {
        if (dt1 && dt2) {
            return moment(Date.parse(dt1)).utcOffset(dt1) > moment(Date.parse(dt2)).utcOffset(dt2) ? 1 : -1;
        } else if (dt1 && !dt2) {
            return 1;
        } else if (!dt1 && dt2) {
            return -1;
        }
        return 0;
    }
}
