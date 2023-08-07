const fs = require('fs');
const through = require('through2');

/* Create a read stream here */
const readPoemStream = []

fs.createReadStream('on-joy-and-sorrow-emoji.txt', {encoding: 'utf-8'})
  .on('data', (data) => {
    readPoemStream.push(data.replace(/:\)/g, "joy").replace(/:\(/g, "sorrow"))
  })
  .on('end', () => {
    console.log(readPoemStream)
  })