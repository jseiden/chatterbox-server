/* Import node's http module: */
var http = require("http");
// var fs = require("fs");
var handler = require("./request-handler.js");
var port = 3000;
var ip = "127.0.0.1";

var storage = {};

var server = http.createServer(function(request, response){
    handler.requestHandler(request, response);
});
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

