let fs = require('fs')
let path = require('path')
let os = require('os')

const CacheDir = path.join(os.tmpdir(), 'servercache')
console.log("Using cache directory:", CacheDir);

function save (inputStream, inputPath) {
  let cachePath = path.join(CacheDir, inputPath)
  let saveFileStream = fs.createWriteStream(path.join(CacheDir, inputPath))
  return inputStream.pipe(saveFileStream)
}

function read (resourcePath) {
  return fs.createReadStream(path.join(CacheDir, resourcePath))
}

function exists (resourcePath) {
  return fs.existsSync(path.join(CacheDir, resourcePath))
}

function init () {
  // TODO: perhaps a command line argument to force clear?
  if (!fs.existsSync(CacheDir))
    fs.mkdirSync(CacheDir)
}

module.exports = {
  save: save,
  read: read,
  init: init,
  exists: exists
}