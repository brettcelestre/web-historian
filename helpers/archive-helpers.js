var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var fetcher = require('../workers/htmlfetcher.js');
var handler = require('../web/request-handler.js');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

var paths2 = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(){
};

exports.isUrlInList = function(url){
  var route = router[url];
  if (route) {
    return true;
  }
};

exports.addUrlToList = function(url){
  // if (url === '/'){ url = '/index.html'; }
  // console.log('test in addUrlToList');
  // var fileObj = new ActiveXObject('Scripting.FileSystemObject');
  // var thisFile = fileObj.OpenTextFile('../archives/sites.txt');
  // thisFile.WriteLine(url + ',');
  // thisFile.Close();
  // router[url] = null;
  // var newUrl = '/' + url;
  console.log('url === ', url);
  fs.readFile(paths.archivedSites + url, 'utf8', function(err, data){
    if (err) throw err;
    // console.log('data', data);
    router[url] = data;
    // sendResponse(res, data, 200, req.url);
    // console.log(data);

  });  

  console.log('router[stuff]', router);
};

exports.isUrlArchived = function(){
};

exports.downloadUrls = function(url, res){
  // Call function from htmlfetchers.js with url that retrieves page content and returns it.
  // Store the content into paths.archievedSites. 
  router[url] = fetcher.retrieveContent(url, res);
};
