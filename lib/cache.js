let fs = require('fs')
let path = require('path')

const CacheDir = path.join(__dirname, '/..', 'cache')

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
  if (!fs.existsSync(CacheDir))
    fs.mkdirSync(CacheDir)
}

module.exports = {
  save: save,
  read: read,
  init: init,
  exists: exists
}