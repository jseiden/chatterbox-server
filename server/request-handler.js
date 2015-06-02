var requestHandler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  // The outgoing status.

  var jsonString = "";
  request.on("data", function(d){
    jsonString += d;
  })
  if(request.method === "GET"){
    if(request.url === "/classes/messages"){
      response.statusCode = 200;
    } else if(request.method === "POST"){
    response.write("postin");
  }
}

  var statusCode = 200;
  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";

  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(jsonString));

//if POST request
  //add incoming data to storage object
    //??do something to JSON
    //send success message back




//if GET request
  //return contents of storage object
};


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
exports.requestHandler = requestHandler;
