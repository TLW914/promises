/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');
var readline = require('readline');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  fs.readFile(filePath, function(err,data){
    if (err) {
      callback(err,data);
    } else {
      var firstLine = data.toString().split('\n')[0];
      callback(null, firstLine);
    }
  })
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url,callback) {
  // TODO
  request(url, function(err, response, body) {
    if (err) {
      callback(err, response);
    } else {
      callback(null, response.statusCode)
    }
  })
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
