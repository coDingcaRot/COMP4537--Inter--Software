const http = require('http');

let date = require('./modules/utils');
let url = require('url')

http.createServer((req, res) => {
    let q = url.parse(req.url, true); //Check if the url is live and then print it
    
    //get query or ? segment
    let name;
    let queryData = q.query;
    name = queryData.name;
    if(name == null){
        name = "";
    }

    res.writeHead(200, {'Content-Type': 'text/html'}); //header response
    //Display the message
    res.write(
        `<div style="display: flex; justify-content: center; align-items: center; height: 100vh; width: 100vw;">
          <p style="color: blue; text-align: center;">Hello ${name}, What a beautiful day. Server current date and time is * ${date.getDate()}</p>
        </div>`
    )
    res.end(); //end response 
}).listen(8888)

console.log('Server is running...')