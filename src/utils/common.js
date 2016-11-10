/**
 * Utility function to execute callback for eack key->value pair.
 */
export function forEach(obj, callback) {
  if (obj) {
    for (const key in obj) { // eslint-disable-line no-restricted-syntax
      if ({}.hasOwnProperty.call(obj, key)) {
        callback(key, obj[key]);
      }
    }
  }
}

/**
 * The function returns true if the string passed to it has no content.
 */
export function isEmptyString(str) {
  if (str === undefined || str === null || str.length === 0 || str.trim().length === 0) {
    return true;
  }
  return false;
}

/**
 * The function will return true for simple javascript object,
 * which is not any other built in type like Array.
 */
export function isMap(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * Utility function to merge 2 objects.
 */
export function size(object) {
  if (object) {
    let count = 0;
    forEach(object, () => {
      count += 1;
    });
    return count;
  }
  return undefined;
}
