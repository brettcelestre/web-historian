var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
<<<<<<< HEAD
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
=======
var html = require('../workers/htmlfetcher');
var headers = require('./http-helpers');
// require more modules/folders here!

exports.sendResponse = function(res, data, method, url) {
  method = method || 200;
  res.writeHead(method, headers.headers);
  res.end(data);
};

var actions = {
  "GET": function(req, res){

    if (archive.isUrlInList(req.url)) {
      // console.log('GET if = true');
      // this.sendResponse(res, archive.router[req.url], 200, req.url);
    }
    else {  
      // console.log('GET else:');
      html.retrieveContent(req.url, res, 200);
    } 
  },
  "POST": function(){
    // use archive.addUrlToList
    // use archive.downloadUrls

    // call sendResponse with that content inside archive.paths.archievedSites
  },
  "OPTIONS": function(){}
};

exports.handleRequest = function (req, res) {
  // Checks if the url is requesting index.html
  if ( req.url === '/' ){
    fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', function(err, data){
      if (err) throw err;
      exports.sendResponse(res, data, 200, req.url);
    });
  } else {
    // Checks for any other URL
    var action = actions[req.method];
    if (action) {
      action(req, res)
    } else {
      sendResponse(res, '', 404)
      res.end(archive.paths.list);
    }
>>>>>>> 67c5a28b9690f983fb224cc7e4e5ead1738bba7b
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