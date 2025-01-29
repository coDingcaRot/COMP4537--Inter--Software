const http = require('http');
let date = require('./modules/utils');
let url = require('url')

const server = (req, context, callback) => {
    let q = url.parse(req.path, true); //Check if the url is live and then print it
    
    //get query or ? segment
    let name;
    let queryData = q.query;
    name = queryData.name;
    if(name == null){
        name = "";
    }

    const html = `
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; width: 100vw;">
            <p style="color: blue; text-align: center;">Hello ${name}, What a beautiful day. Server current date and time is * ${date.getDate()}</p>
        </div>
    `;


    callback(null, {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html',
        },
        body: html,
    });
};

module.exports = server