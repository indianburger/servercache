'use strict';

var fs = require('fs');
var path = require('path');
var os = require('os');

var CacheDir = path.join(os.tmpdir(), 'servercache');
console.log("Using cache directory:", CacheDir);

function save(inputStream, inputPath) {
  var cachePath = path.join(CacheDir, inputPath);
  var saveFileStream = fs.createWriteStream(path.join(CacheDir, inputPath));
  return inputStream.pipe(saveFileStream);
}

function read(resourcePath) {
  return fs.createReadStream(path.join(CacheDir, resourcePath));
}

function exists(resourcePath) {
  return fs.existsSync(path.join(CacheDir, resourcePath));
}

function init() {
  // TODO: perhaps a command line argument to force clear?
  if (!fs.existsSync(CacheDir)) fs.mkdirSync(CacheDir);
}

module.exports = {
  save: save,
  read: read,
  init: init,
  exists: exists
};