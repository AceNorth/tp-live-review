window.utils = {
  /**
 * create an index of rows based on id
 * @param {Array<DbRecord>} array array of records
 * @return {Object<DbRecrod>}
 */
  indexCollection: function indexCollection(arr) {
    return arr.reduce(function(snowBall, current) {
      snowBall[current.id] = current;
      return snowBall;
    }, {});
  }
}