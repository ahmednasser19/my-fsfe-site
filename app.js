const http = require("http");

http.createServer(function (req,res){
	res.write("on The way to being a fullstack engineer!");
	res.end();
}).listen(3000);

console.log("Server started on the  port 3000");


