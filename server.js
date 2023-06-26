const http = require('http');
const fs = require('fs');
const { openSync, closeSync, appendFileSync } = require('fs');

let fd;

function logToFile(filename = 'hi_log.txt', log) {
  if (typeof filename !== "string" && typeof log !== 'string' && !fs.existsSync(filename)) {
    return
  }
  try {
    fd = openSync(filename, 'a');
    appendFileSync(fd, log);
  } catch (err) {
    console.log(err)
    /* Handle the error */
  } finally {
    if (fd !== undefined)
      closeSync(fd);
  } 
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
  else if (request.method === 'POST' && request.url === '/sayHi') {
    // code here...
    try {
      fd = openSync('hi_log.txt', 'a');
      appendFileSync(fd, 'Somebody said hi.\n');
      console.log('The "Somebody said hi.\n" was appended to file!');
    } catch (err) {
      console.log(err)
      /* Handle the error */
    } finally {
      if (fd !== undefined)
        closeSync(fd);
    } 
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

      logToFile('hi_log.txt', `${body}\n`)

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
    
  }
}

const server = http.createServer(doOnRequest)

server.listen(3000);
