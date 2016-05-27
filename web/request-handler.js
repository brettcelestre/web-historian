var path = require('path');
var archive = require('../helpers/archive-helpers');
var utils = require('./http-helpers');
var urlParser = require('url');
// require more modules/folders here!

var actions = {
  'GET': function(request, response){
    var parts = urlParser.parse(request.url);   // This parses our URL and stores it in var parts
    var urlPath = parts.pathname === '/' ? '/index.html' : parts.pathname;  // Checks to see if the request was the index
                                                            // If it is, we update urlPath
    utils.serveAssets(response, urlPath);
  },
  'POST': function(request, response){
    utils.collectData(request, function(data){            // Invokes collectData from http-helpers
      var url = data.split('=')[1];                       // Splits off '/' from the URL
      archive.isUrlInList( url, function(found){          // First we check if the URL already exists inside out list
        if ( found ) {                                    // If it is found
          archive.isUrlArchived( url, function(exists){   // We want to check if the site is archived
            console.log('exists: ', exists);
            if ( exists ) {                               // Exists returns a boolean
              //console.log('isUrlArchived');
              //console.log('isUrlArchived url = ', url);
              
              // 43:13
              
              utils.sendRedirects(response, '/' + url); // Displays - page
            } else {  
              console.log('failed: ');
              utils.sendRedirects(response, '/loading.html'); // Displays loading page, updates the URL so not stuck on index.
            }
          });
        } else {                                            // Url does not exist, therefore we need to add it.
          archive.addUrlToList(url, function(){             // Pass url into our addUrlToList function from archive-helpers
            utils.sendRedirects(response, '/loading.html'); // Displays loading page, updates the URL so not stuck on index.
          });
        }
      });
    });
  }
};

exports.handleRequest  = function(request, response) {
  var action = actions[request.method];
  if ( action ){
    action(request, response)
  } else {
    utils.sendResponse(response, 'Not Found', 404);
  }
};