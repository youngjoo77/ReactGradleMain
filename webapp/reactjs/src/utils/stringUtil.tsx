/**
 * description:
 * - string 이 비어 있는지 검증 한다.
 * 
 * example:
 *
 * - [example] : ''
 * - [RESULT] : true
 * 
 */
export const isNull = (str: string) => {
    if(str === null || typeof str !== 'string' || str === '') {
        return true;
    }
    else {
        return false;
    }
}