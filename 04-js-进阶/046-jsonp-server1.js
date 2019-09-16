var http = require('http');

var fs = require('fs');
var url = require('url');

var server = http.createServer(function(req,res){
	var urlStr = req.url;
	var parm = url.parse(urlStr,true).query;
	console.log(parm);
	/*
	var str = 'nihao';
	res.end(parm.callback+'("'+str+'")');
	*/
	var obj = '{"name":"tom","age":18}';
	res.end(parm.callback+'('+obj+')');

});

server.listen(3001,"127.0.0.1",function(){
	console.log("server is running at http://127.0.0.1:3001");
});