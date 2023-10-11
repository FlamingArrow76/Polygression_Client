const http = require('http')
const fs = require('fs')
//const port = 8000
const port = 4200

const url = require('url')

function onRequest(req, res) {
    timestamp = new Date();
    console.log("Request for URL " + req.url + " received at " + timestamp);
    if (req.url === '/error') {
      console.log('Throwing an error');
      throw "Oops";
    }
    
    var path = url.parse(req.url, true).pathname;
    var file = '.' + path;

    if (path == '/') {
        file = './index.html';
    }

    fs.readFile(file, function(error, data) {
        if (error) {
            res.writeHead(404);
            res.write('Error: File Not Found');
        } else {
            if (path.endsWith('.css')) {
                res.writeHead(200, {'Content-Type': 'text/css'});
            } 
            else if (path.endsWith('.js')) {
                res.writeHead(200, {'Content-Type': 'text/javascript'});
            }
            else {
                res.writeHead(200, {'Content-Type': 'text/html'});
            }
            res.write(data);
        }
        res.end();
    });
}

//http.createServer(onRequest).listen(port, function(error){
http.createServer(onRequest).listen(port,"0.0.0.0", function(error){
    if(error){
        console.log('Something went wrong: ', error)
    }
    else{
        console.log('Server is listening on port: ', port)
    }
})




