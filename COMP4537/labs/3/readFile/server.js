const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

http.createServer((req, res) => {
    const q = url.parse(req.url, true);
    const filename = path.basename(q.pathname); // The file you want to display

    // Define the path to 'file.txt' in the writeFile folder
    const filePath = path.join(__dirname, '../writeFile', filename);

    // Check if the file exists
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' }); // File not found
            res.write(`404 File not found: ${filename}\n`);
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' }); // Success, file content returned
            res.write(data); 
            res.end();
        }
    });

}).listen(8000);

console.log('Server running ...');
