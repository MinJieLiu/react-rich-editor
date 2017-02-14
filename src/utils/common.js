/**
 * Utility function to execute callback for eack key->value pair.
 */
export function forEach(obj, callback) {
  if (obj) {
    Object.keys(obj).forEach((key) => {
      callback(key, obj[key]);
    });
  }
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
