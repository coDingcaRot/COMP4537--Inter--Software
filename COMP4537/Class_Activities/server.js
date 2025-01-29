// Lecture 4 Node server
const http = require('http');

http.createServer((req, res) => {
    console.log(req)
    console.log("Hi");
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello <b>World!</b>');
}).listen(8888);

console.log('Server is running and listening...')