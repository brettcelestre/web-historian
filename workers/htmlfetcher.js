// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var fs = require('fs');
var http = require('http');
var request = require('../web/request-handler');
var archive = require('../helpers/archive-helpers');

exports.retrieveContent = function(url, res, method) {
  fs.readFile(archive.paths.archivedSites + url, 'utf8', function(err, data) {
    if (err) {
      console.error(err);
      return;
    }
    request.sendResponse(res, data, method, url);
  });
};
