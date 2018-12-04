/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  var promise = new Promise(function(resolve, reject) {
    fs.readFile(filePath, function(err, data) {
      if (err) {
        reject(err);
      } else {
        var firstLine = data.toString().split('\n')[0];
        resolve(firstLine);
      }
    });
  });
  //pass in whatever you put in to reject or resolve, e.g line = firstLine
  promise.then(function(line) {
    // give success message
      //this is where we would define any success behavior
    console.log('SUCCESS! Payload: ' + line);
  }).catch(function(err) {
    console.log('Handled Promise Error: ' + err);
  });
  //promise itself contains our data - i.e. firstLine;
  return promise;
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  var promise = new Promise(function(resolve, reject) {
    request(url, function(err, response, body) {
      if (err) {
        reject(err);
      } else {
        resolve(response.statusCode);
      }
    });
  });

  promise.then(function(status) {
    console.log('SUCCESS! Payload: ' + statuscode);
  }).catch(function(err) {
    console.log('Handled Promise Error: ' + err);
  });
  return promise;
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};

// request(url, function(err, response, body) {
//   if (err) {
//     callback(err, response);
//   } else {
//     callback(null, response.statusCode);
//   }
// });