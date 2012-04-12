/*
 * upload
 * https://github.com/rubymaverick/node-ajax-file-upload
 *
 * Copyright (c) 2012 Eric Allam
 * Licensed under the MIT license.
 */

var http = require('http'),
    fs = require('fs');

var app = http.createServer(function(req, response){
  if(req.url === "/"){
    response.writeHead(200, {'Content-Type': 'text/html'});

    fs.readFile(__dirname + "/index.html", function(err, data){
      response.end(data);
    });

  }else if(req.url === "/zepto.js") {

    response.writeHead(200, {'Content-Type': 'text/javascript'});

    fs.readFile(__dirname + '/public/zepto.js', function(err, data){
      response.end(data);
    });

  }else{
    name = req.headers['x-file-name'];
    file = fs.createWriteStream(__dirname + "/tmp/" + name);
    req.pipe(file);

    req.on('end', function(){
      response.writeHead(200);
      response.end();
    });
  }
});

if(!module.parent){
  var port = process.env.PORT;
  app.listen(port, function() { console.log("Listening on port " + port); });
}
