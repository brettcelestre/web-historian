// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var http = require('http');

exports.retrieveContent = function(url, res) {
  // console.log('inside retrieveContent', url);
  // view-source:url
  http.get('http://www.google.com', function (err, res) {
    if (err) {
      console.error(err);
      // console.log('RES.CODE ', res.code);
      return;
    }
    console.log('http test', res.buffer.toString());
    //console.log(res.code, res.headers, res.buffer.toString());
    // return res.code;
  });

};
//Read archives/sites.txt  -- this is the list of url sites that have already been archived.  

//Add files to archives/sites/ -- this is the actual files of the sites that have been archived