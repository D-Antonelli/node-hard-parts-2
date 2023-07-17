const fs = require('fs');
const through = require('through2');

/* Create a read stream here */
const readPoemStream = []

fs.createReadStream('on-joy-and-sorrow-emoji.txt')
  .pipe(through(function (chunk, enc, callback) {
    for (let i = 0; i < chunk.length; i++)
    // hexadecimal representation of characters.
        this.push(chunk)
        callback()
   }))
   .on('data', (data) => {
        readPoemStream.push(data.toString('utf8'))
    })
  .on('end', () => {
    console.log(readPoemStream)
  })
//   .pipe(fs.createWriteStream('out.txt'))



/* Create a write stream here
const writePoemStream =
*/

/* EXTENSION: Create a transform stream (modify the read stream before piping to write stream)
const transformStream = ???
readPoemStream.pipe(transformStream).pipe(writePoemStream)
*/