var requestHandler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  // The outgoing status.

  var obj = {};
  obj.results = [];
  var jsonString = "";
  var statusCode;
  request.on("data", function(d){
    jsonString += d;
    obj.jsonString = jsonString;
    // obj.results.push(d);
  })

  if(request.method === "GET"){
    if(request.url === "/classes/messages"){
       statusCode = 200;
    }
  }
  if(request.method === "POST"){
      if(request.url === "/classes/messages"){
        statusCode = 201;
      }
   }


  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";

  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(obj));

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
