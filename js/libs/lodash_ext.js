/**
 * ================================================
 * Extending lodash
 * ================================================
 */
_.mixin({
  /**
   * Returns min if number is lower than min or max when number greater than max
   * Otherwise just number.
   * @param {Number} value
   * @param {Number} min - Min value or 0
   * @param {Number} max - Max value or 100
   * @return {Number}
   */
  clamp: function(value, min, max) {
    min = min || 0;
    max = max || 100;
    if (max < min) {
       var swap = max;
       max = min;
       min = swap;
     }
    return Math.max(min, Math.min(value, max));
  },

  /**
   * Returns random string. Useful for IDs
   * @param {Number} chars - The string length
   * @return {String}
   */
  randomId: function(chars) {
    chars = chars || 15;
    return (Math.random() + 1).toString(36).substring(2, chars);
  },

  /**
   * Returns value as array, if it is not an array
   * @param {mixed} value
   * @return {Array}
   */
  wrapInArray: function(value) {
    return !_.isArray(value) ? [value] : value;
  }
});
