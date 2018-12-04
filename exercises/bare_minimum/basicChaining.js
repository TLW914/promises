/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

// getGitHubProfileAsync,
// generateRandomTokenAsync,
// readFileAndMakeItFunnyAsync


var Promise = require('bluebird');
var helperFunctions = require('./promisification.js');
var fs = require('fs');
var fsAsync = Promise.promisifyAll(fs);
var readlineAsync = require('./promiseConstructor').pluckFirstLineFromFileAsync;


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  //readlineAsync = pluckFirstLineFromFileAsync (see require above)
  return readlineAsync(readFilePath) //returns a promise that contains username
    .then (function(username) { //on that promise we invoke next function
      return helperFunctions.getGitHubProfileAsync(username); //returns a promise
    })
    .then(function(data) { //on that promise we invoke next function
      return fsAsync.writeFileAsync(writeFilePath, JSON.stringify(data)); //does the final behavior we want
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};


// var addNewUserToDatabaseAsync = function(user) {
//   // The outermost `return` lets us continue the chain
//   // after an invocation of `addNewUserToDatabaseAsync`
//   return db.findUserInDatabaseAsync(user)
//     .then(function(existingUser) {
//       if (existingUser) {
//         throw new Error('User already exists!'); // Head straight to `catch`. Do not pass Go, do not collect $200
//       } else {
//         return user; // Return a syncronous value
//       }
//     })
//     .then(function(newUser) {
//       return db.hashPasswordAsync(newUser); // Return a promise
//     })
//     .then(function(securedUser) {
//       return db.createAndSaveUserAsync(securedUser); // Return another promise
//     });
// };

// addNewUserToDatabaseAsync({ name: 'Dan', password: 'chickennuggets' })
//   .then(function(savedUser) {
//     console.log('All done!');
//   })
//   .catch(function(err) {
//     // Will catch any promise rejections or thrown errors in the chain!
//     console.log('Oops, caught an error: ', err.message);
//   });

