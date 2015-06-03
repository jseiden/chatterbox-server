var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/JSON"
};
var objectId = 1;
exports.requestHandler = function(request, response) {
  var obj = {};
  obj.results = [];

  var statusCode = 200;
  if(request.method === "GET"){
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(obj));
  } else if(request.method === "POST"){
      var input = "";
      request.on('data', function(chunk){
        var resObj = {};
        input += chunk;
        resObj[objectId] = input;
        obj.results.push(resObj);
          console.log(response);
        objectId++;
      });
      request.on('end', function(){
        // request.end(input);
      });


    statusCode = 201;
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify("Hello, World!"));
  } else{
    response.end(response);
  }
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log("Serving request type " + request.method + " for url " + request.url);

  // The outgoing status.

  // See
  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.


  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

