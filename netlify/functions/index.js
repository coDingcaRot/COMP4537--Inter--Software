const server = require('../../COMP4537/labs/3/getDate/server');

exports.handler = async (event, context) => {
    return new Promise((resolve, reject) => {
        server(event, context, (err, result) => {
           if(err){
             reject(err);
             return
         }
         resolve(result);
     });
 })
};