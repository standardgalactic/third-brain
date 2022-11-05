```js
const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // Create readable stream for the file
  const readable = fs.createReadStream('test-file.txt')
  // When a chunk of data is read, it is written to the response body's
  // writable stream
  readable.on('data', chunk => {
    res.write(chunk)
  })

  // When the readable stream finishes
  readable.on('end', () => {
    res.end();
  })
  
  readable.on('error', err => {
    console.log(err);
    res.statusCode = 404;
    res.end('file not found')
  })
})

server.listen(8000, '127.0.0.1', () => {
  console.log("Listening...")
})
```

## Problem in the above code
The problem with the above code that the file read stream is way faster than the response stream. In other words, the read stream is way faster than the write stream here.

This causes an issue called **back-pressure**

### Solution to **backpressure**
```js
.
.
.

server.on(.. => {
  const readable = fs.createReadStream('test-file.txt')
  // Pipe the readable stream into the response writable stream
  readable.pipe(res)
})
```