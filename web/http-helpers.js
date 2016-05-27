var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var Q = require('q');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

// As you progress, keep thinking about what helper functions you can put here!

exports.sendResponse = function(response, obj, status) {
  status = status || 200;
  response.writeHead(status, headers);
  response.end(obj);
};

exports.collectData = function(request, callback){
  var data = '';
  request.on('data', function(chunk){
    data += chunk;
  });
  request.on('end', function(){
    callback(data);
  });
};

exports.serveAssets = function( response, asset ) {
  var encoding = {encoding: 'utf8' };
  // First we check in our public folder for the URL
  fs.readFile( archive.paths.siteAssets + asset, encoding, function(err, data){
    if ( err ) {  // if it doesn't exist in our public folder
      fs.readFile( archive.paths.archivedSites + asset, encoding, function(err, data){
        if ( err ) {  // if it doesn't exist in our public folder either
          exports.send404(response);  // Send a 404 error with 
        } else  {
          exports.sendResponse(response, data); // if it does exist, serve back the data
        }
      });
    } else {
      exports.sendResponse(response, data); // If the file exists in the public folder, serve it back
    }
  });
};

exports.send404 = function(response){                           // Function is for when the url doesn't exist in
  exports.sendResponse(response, '404: Page not found', 404);   // our archivedSites folder
}

exports.sendRedirects = function(response, location, status) {
  status = status || 302;
  response.writeHead(status, {Location: location});
  response.end();
};

