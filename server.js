const http = require('http');
const fs = require('fs');
const { openSync, closeSync, appendFileSync } = require('fs');

let fd;
let filename = "hi_log.txt"

function writeFile(filename, log) {
  if (typeof filename !== "string" && typeof log !== 'string') {
    console.log("Write file: incorrect param type")
    return
  }
  try {
    fd = openSync(filename, 'a');
    appendFileSync(fd, log);
  } catch (err) {
    console.log(err)
  } finally {
    if (fd !== undefined)
      closeSync(fd);
  } 
}

function updateFile(filename, log) {
  if (typeof filename !== "string" && typeof log !== 'string') {
    console.log("Update file: incorrect param type")
    return
  }
  fs.writeFile(filename, log, function(err){
    if(err) return console.log(err);
    console.log('The file has been overwritten');
});
}

function doOnRequest(request, response){
  // Send back a message saying "Welcome to Twitter"
  // code here...
  // response.end("Welcome to Twitter")
  // response.end("yo")
  if (request.method === 'GET' && request.url === '/') {
    // read the index.html file and send it back to the client
    // code here...
    response.end(fs.readFileSync('index.html'))
    // fs.createReadStream()

  }
  else if (request.method === 'GET' && request.url === '/style.css') {
    response.end(fs.readFileSync('style.css'))
  }
  else if (request.method === 'PUT' && request.url === '/update') {
    let body = []
    try {
      request.on('data', (chunk) => {
        body.push(chunk)
      }).on('end', () => {
        body = Buffer.concat(body).toString();
        updateFile(filename, body)
        response.end("Updated")
      })
    } catch {
      console.log("error")
    }
    
  }
  else if (request.method === 'POST' && request.url === '/sayHi') {
    // code here...
    writeFile(filename, 'Somebody said hi.\n')
    response.end("hi back to you!")
  }
  else if (request.method === 'POST' && request.url === '/greeting') {
    // accumulate the request body in a series of chunks
    // code here...
    let body = []

    request.on('data', (chunk) => {
      body.push(chunk)
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      // at this point, `body` has the entire request body stored in it as a string

      writeFile(filename, `${body}\n`)

      if (body === "hello") {
        response.end("hello there!")
      } 
      else if (body === "what's up") {
        response.end("the sky")
      } else {
        response.end("good morning")
      }

    })
    
  }
  else {
    // Handle 404 error: page not found
    // code here...
    response.statusCode = 404
    response.end('Error: Not Found')
    
  }
}

const server = http.createServer(doOnRequest)

server.listen(3000);
