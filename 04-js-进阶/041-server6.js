var http = require('http');
var fs  = require('fs');
var url  = require('url');

var server = http.createServer(function(req, res){
	// console.log(req.method);
	var urlStr = req.url;
	if(req.method == 'POST'){
		var body = '';
		req.on('data',function(chunk){
			body += chunk;
		});
		req.on('end',function(){
			console.log('get post data::',body);
			//根据数据做处理....
			res.end(body);
		})
	}else if(req.method == 'GET'){
		if(urlStr.search(/\?/) != -1){
			var parm = url.parse(urlStr,true).query;
			console.log(typeof parm)
			//根据数据做处理....
			var json = JSON.stringify(parm);
			res.end(json);
		}
		if(urlStr == '/favicon.ico'){
			res.end('favicon.ico')
		}
		var filePath  = './'+urlStr;
		fs.readFile(filePath,function(err,data){
			if(!err){
				res.end(data);
			}else{
				res.statusCode = 404;
				res.end('not found...')
			}
		})
	}
	
});

server.listen(3000, '127.0.0.1', function(){
  console.log("Server running at http://127.0.0.1:3000");
});