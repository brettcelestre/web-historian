var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

var sendResponse = function(res, data, method, url) {
  method = method || 200;
  res.writeHead(method, archive.headers);

  res.end(JSON.stringify(data));
};

var actions = {
  "GET": function(req, res){
    //use archive.isUrlInList, if true
    if (archive.isUrlInList(req.url)) {
      //retrieve site from archive.paths.archivedSites
      console.log('GET works');
    }
    //else, 
      //call POST fucntion with req and res
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
  // console.log('request url: ', req.url);
  var action = actions[req.method];
  if (action) {
    action(req, res)
  } else {
    sendResponse(res, '', 404)
  }
  // res.end(archive.paths.list);
};
