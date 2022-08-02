import moment from 'moment'

export const defaultDateformat = 'YYYYMMDD';
export const inputDateformat = 'yyyy-MM-dd';

/**
 * description:
 * - date 를 string 으로 변환 한다.
 * 
 * example:
 *
 * - [example] : DateUtil.dateToString(new Date(), 'YYYYMMDD')
 * - [RESULT] : '20220802'
 */
export const dateToString = (date: Date, dateformat: string | null) => {
    const format = dateformat === null ? defaultDateformat : dateformat;
    if (date === null) {
        return null;
    }

    return moment(date).format(format);
}

/**
 * description:
 * - string 을 date 로 변환 한다.
 * 
 * example:
 *
 * - [example] : DateUtil.stringToDate('20220729', 'YYYYMMDD')
 * - [RESULT] : Fri Jul 29 2022 00:00:00 GMT+0900
 */
export const stringToDate = (date: string, dateformat: string | null) => {
    const format = dateformat === null ? defaultDateformat : dateformat;

    if (isValidDateString(date, format)) {
        return moment(date, format).toDate();
    }
    else {
        return null;
    }
}

/**
 * description:
 * - date 형식의 string 을 검증 한다.
 * 
 * example:
 *
 * - [example] : DateUtil.isValidDateString('2019-09-01', 'YYYYMMDD')
 * - [RESULT] : true
 * 
 * - [example] : DateUtil.isValidDateString('2019-22-22', 'YYYY-DD-MM')
 * - [RESULT] : false
 * 
 * - [example] : DateUtil.isValidDateString('2019-22-12', 'YYYY-DD-MM')
 * - [RESULT] : true
 */
export const isValidDateString = (date: string, dateformat: string | null) => {
    const format = dateformat === null ? defaultDateformat : dateformat;
    if (date === null || date === '') {
        return false;
    }

    return moment(date, format).isValid();
}