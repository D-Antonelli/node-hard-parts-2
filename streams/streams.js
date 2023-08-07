const fs = require("fs");
const path = require("path");
const {pipeline} = require("stream");
const through = require("through2");

/* Create a read stream here */
const readPoemStream = [];

// Create a readable stream from source.txt
const readableStream = fs.createReadStream("on-joy-and-sorrow-emoji.txt");

readableStream.setEncoding("utf-8");

// Create a writable stream to destination.txt
const writableStream = fs.createWriteStream("on-joy-and-sorrow-fixed.txt");

readableStream.pipe(writableStream);

readableStream
  .on("data", (data) => {
    readPoemStream.push(data.replace(/:\)/g, "joy").replace(/:\(/g, "sorrow"));
  })
  .on("end", () => {
    console.log(readPoemStream);
  });
