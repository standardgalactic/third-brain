![rw-book-cover](https://readwise-assets.s3.amazonaws.com/static/images/article0.00998d930354.png)

## Metadata
- Author: [[defn.io]]
- Full Title: Web Application From Scratch, Part I
- URL: https://defn.io/2018/02/25/web-app-from-scratch-01/

## Highlights
- Requests are represented by a series of `\r\n`-separated lines, the first of which is called the “request line”. The request line is made up of an HTTP method, followed by a space, followed by the path of the file being requested, followed by another space, followed by the HTTP protocol version the client speaks and, finally, followed by a carriage return (`\r`) and a line feed (`\n`) character:
  1
  GET /some-path HTTP/1.1\r\n ([View Highlight](https://read.readwise.io/read/01h1dv3kw54fqx6p1baqa3zp88))
- After the request line come zero or more header lines. Each header line is made up of the header name, followed by a colon, followed by an optional value, followed by `\r\n`:
  1
  2
  Host: example.com\r\n
  Accept: text/html\r\n ([View Highlight](https://read.readwise.io/read/01h1dv42cqdh4trgyzg7fejr3j))
- The end of the headers section is signaled by an empty line:
  1
  \r\n ([View Highlight](https://read.readwise.io/read/01h1dv49gff96r2f6k7vsa0mjb))
- Finally, the request may contain a “body” – an arbitrary payload that is sent to the server with the request. ([View Highlight](https://read.readwise.io/read/01h1dv53ks89bg4my5g0dsbnfk))
- here’s a simple `POST` request with a body:
  1
  2
  3
  4
  5
  6
  7
  POST / HTTP/1.1\r\n
  Host: example.com\r\n
  Accept: application/json\r\n
  Content-type: application/json\r\n
  Content-length: 2\r\n
  \r\n
  {} ([View Highlight](https://read.readwise.io/read/01h1dv5btgcqn88bbzjgp4qgs6))
- Responses, like requests, are made up of a series of `\r\n`-separated lines. The first line in the response is called the “status line” and it is made up of the HTTP protocol version, followed by a space, followed by the response status code, followed by another space, then the status code reason, followed by `\r\n`:
  1
  HTTP/1.1 200 OK\r\n ([View Highlight](https://read.readwise.io/read/01h1dv7kvw8t99negp09d78tv5))
- After the status line come the response headers, then an empty line and then an optional response body:
  1
  2
  3
  4
  5
  HTTP/1.1 200 OK\r\n
  Content-type: text/html\r\n
  Content-length: 15\r\n
  \r\n
  <h1>Hello!</h1> ([View Highlight](https://read.readwise.io/read/01h1dv8fp497229z708gnrj4zg))
