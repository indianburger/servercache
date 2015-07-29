'use strict';

var http = require('http');
var fs = require('fs');
var path = require('path');
var argv = require('yargs').demand('host').argv;

var port = argv.port || 3002;

var cache = require('./cache');
cache.init();

http.createServer(onRequest).listen(port);
console.log('server started on', port);

function onRequest(clientReq, clientResp) {
  var requestUrl = clientReq.url;
  console.log('serve: ' + requestUrl);

  if (cache.exists(requestUrl)) {
    console.log('cache HIT');
    var cachedFileStream = cache.read(requestUrl);
    cachedFileStream.pipe(clientResp);
  } else {
    console.log('cache miss');
    var options = {
      hostname: argv.host,
      path: requestUrl
    };
    var httpRequestStream = http.request(options, function (res) {
      res.pipe(clientResp);
      cache.save(res, requestUrl);
    });
    clientReq.pipe(httpRequestStream);
  }
}