const fs = require("fs");
const path = require("path");
const {pipeline} = require("stream");
const through = require("through2");


// Create a readable stream from source.txt
const readableStream = fs.createReadStream("on-joy-and-sorrow-emoji.txt");

readableStream.setEncoding("utf-8");

// Create a writable stream to destination.txt
const writableStream = fs.createWriteStream("on-joy-and-sorrow-fixed.txt");


readableStream
.pipe(through(function(chunk,enc,callback) {
  let text = chunk.toString()
  let transform = text.replace(/:\)/g, "joy").replace(/:\(/g, "sorrow")
  this.push(transform)
  callback()
}
))
.pipe(writableStream)
.on("finish", () => console.log("done"))
