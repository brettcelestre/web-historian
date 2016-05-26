var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
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
  }
};
