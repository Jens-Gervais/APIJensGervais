const http = require("http"); 
//create a server object: 
http 
  .createServer(function (req, res) { 
    res.write("Welcome on our API server!");  
    //write a response to the client 
     
    res.end();  
    //end the response 
  }) 
  .listen(3000);