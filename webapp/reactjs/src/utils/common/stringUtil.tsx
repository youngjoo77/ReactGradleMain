/**
 * @description:
 * string 이 비어 있는지 검증 한다.
 * 
 * @example
 * @Return
 */
const isNull = (str: string | null | undefined) => {
    if (str === null || typeof str !== 'string' || str === '') {
        return true;
    }
    else {
        return false;
    }
}

export { isNull }