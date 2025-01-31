// Writefile
const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {
    const q = url.parse(req.url, true);
    let text = q.query.text;


    // Check if there is any text to append
    if (!text) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('No text to write.\n');
        res.end();
        return;
    }

    fs.appendFile('file.txt', `${text}\n`, (err) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' }); // Internal Server Error
            res.write('Error occurred, text not written.\n');
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write('Text appended to file.\n');
            res.end();
        }
    });

}).listen(8500);

console.log('Running server.js ...')

