var express = require("express"),
    cons = require("consolidate"),
    less = require("less"),
    coffee = require("coffee-script"),
    fs = require("fs");
	url = require("url");
	
	
global.app = express();
global.path = __dirname;
// global.mode ="readonly";

var server = require("./server/server.js");
var mongo = require("./server/lib/mongodb.js");

for(var i in cons){
    if (i == "clearCache") continue;
    else app.engine(i,cons[i]);
}

function less_render(path,opts,callback){
    less.render(fs.readFileSync(path,"utf-8"),callback);
}
function coffee_render(path,opts,callback){
    try { callback(null,coffee.compile(fs.readFileSync(path,"utf-8"))); }
    catch(e) {callback(e,"");}

}

app.engine("html",require('ejs').renderFile);
app.engine("jade",require('jade').__express);
app.engine("less",less_render);
app.engine("coffee",coffee_render);
app.engine("css",less_render);

app.configure(function(){
    app.use("/static/",require('less-middleware')({ src: __dirname + '/client/static' }));
    app.use("/static/",express.static(__dirname + '/client/static'));
    app.use("/uploads/",express.static(__dirname + '/uploads'));
    app.use("/downloads/",express.static(__dirname + '/downloads'));
    app.use(express.limit('15mb'));
    app.use(express.bodyParser({keepExtensions:true,uploadDir:__dirname+"/uploads"}));

});

app.configure("development",function(){
    app.use(express.logger());
    app.use(function(req,res,next){
        for(var i in require.cache){
            if ((i.lastIndexOf(global.path+"/node_modules") == -1) && (i != __filename)){
                delete require.cache[i];
            }
        }
        next();
    });
    app.get("/favicon.ico",express.static(__dirname + '/client/static'));
    app.post("/upload",function(req,res,next){
        server = require("./server/server.js");
        server.uploadFiles(req,res,next);
    });
    app.use("/tor",function(req,res){
    	try{
    		console.log("tut");
			function callback(result){
				if(result != undefined){
					res.writeHead(200, {"Content-Type": "application/json"});
					if(result != 1) {res.write(JSON.stringify(result));}
				}else{
					res.writeHead(404);
					res.write("Data not find");
				} 
				res.end();	
			}
			var pathname = url.parse(req.url).pathname;
			console.log(pathname);
			var key = pathname.match(/^\/(\w+){1,25}/, pathname)[1];
		  	mongo.sync(req, req.body, key, callback);
        }
        catch(e){
            console.log(e);
            res.statusCode = 500;
            res.end("Error");
        }

    });
    app.use("/apis",function(req,res){
        try{
            server = require("./server/server.js");
            server.api_proc(req,res)
        }
        catch(e){
            console.log(e);
            res.statusCode = 500;
            res.end("Error");
        }
    });
    app.use(function(req,res){
        try{
            server = require("./server/server.js");
            server.renderIndex(req,res)
        }
        catch(e){
            console.log(e);
            res.statusCode = 500;
            res.end("Error");
        }
    });
});

app.configure("production",function(){
    app.get("/favicon.ico",express.static(__dirname + '/client/static'));
    app.post("/upload",server.uploadFiles);
    app.use(server.renderIndex);
});

app.use(app.router);
app.listen(8000);
console.log("Server started on port: 8000")