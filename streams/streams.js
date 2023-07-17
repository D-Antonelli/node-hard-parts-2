const fs = require('fs');
const through = require('through2');

/* Create a read stream here */
const readPoemStream = []

fs.createReadStream('on-joy-and-sorrow-emoji.txt')
  .pipe(through.obj(function (chunk, enc, callback) {
    this.push(chunk.toString('utf8'))
    callback()
  }))
  .on('data', (data) => {
    readPoemStream.push(data)
  })
  .on('end', () => {
    console.log(readPoemStream)
  })



/* Create a write stream here
const writePoemStream =
*/

/* EXTENSION: Create a transform stream (modify the read stream before piping to write stream)
const transformStream = ???
readPoemStream.pipe(transformStream).pipe(writePoemStream)
*/