var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

var sendResponse = function(res, data, method, url) {
  // console.log('test sendResponse', data);
  method = method || 200;
  res.writeHead(method, archive.headers);
  res.end(data);
};



var actions = {
  "GET": function(req, res){
    // sendResponse(res, )
    //use archive.isUrlInList, if true
    if (archive.isUrlInList(req.url)) {
      sendResponse(res, archive.router[req.url], 200, req.url);
    }
    else {
      // console.log('GET')
      //call POST function with req and res
      archive.addUrlToList(req.url);    // Adds url to archive router
      // archive.downloadUrls(req.url, res);
      sendResponse(res, archive.router[req.url], 200, req.url);

      //setTimeout(function(){return sendResponse(res, archive.router[req.url], 200, req.url) }, 1000);

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
  // console.log('request method: ', req.method);
  if ( req.url === '/' ){
    // console.log('request url: ', req.url);
    //console.log(archive.paths.siteAssets + '/index.html');
    fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', function(err, data){
      if (err) throw err;
      sendResponse(res, data, 200, req.url);
      // console.log(data);

    });
    // return;
  }








  //fs find file / read file/ search folder / 










  // else if ( req.url === '/www.google.com' ) {
  //     // console.log('req.url', req.url);
  //   fs.readFile(archive.paths.archivedSites + '/www.google.com', 'utf8', function(err, data){
  //     if (err) throw err;
  //     sendResponse(res, data, 200, req.url);
  //     // console.log(data);
  //   });
  // } else {
  //   sendResponse(res, '', 404, req.url)
  // }
  var action = actions[req.method];
  if (action) {
    action(req, res)
  } else {
    sendResponse(res, '', 404)
  }
  res.end(archive.paths.list);
};
