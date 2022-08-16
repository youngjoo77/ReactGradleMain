/**
 * @description
 * object 가 비어 있는지 검증 한다.
 * 
 * @example
 * @Return
 * 
 */
const isEmptyObj = (obj: Object) => {
  if (obj.constructor === Object
    && Object.keys(obj).length === 0) {
    return true;
  }

  return false;
}

export { isEmptyObj }