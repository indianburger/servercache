let http = require('http')
let fs = require('fs')
let path = require('path')
var argv =
  require('yargs')
  .demand('host')
  .argv;

let port = argv.port || 3002

let cache = require('./cache')
cache.init()

http.createServer(onRequest).listen(port);
console.log('server started on', port)

function onRequest(clientReq, clientResp) {
  let requestUrl = requestUrl
  console.log('serve: ' + requestUrl);

  if (cache.exists(requestUrl)) {
    console.log('cache HIT');
    let cachedFileStream = cache.read(requestUrl)
    cachedFileStream.pipe(clientResp)
  } else {
    console.log('cache miss');
    let options = {
      hostname: argv.host,
      path: requestUrl,
    }
    let httpRequestStream = http.request(options, res => {
      res.pipe(clientResp)
      cache.save(res, requestUrl)
    })
    clientReq.pipe(httpRequestStream)
  }
}