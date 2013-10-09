var url = require("url");
var fs = require("fs");
var ObjectID = require('mongodb').ObjectID;
var MongoClient = require('mongodb').MongoClient;
var srvUrl = "mongodb://localhost:27017/tordb";
var urlId = "/tor/";


function initMongo(server, scheme){
	srvUrl = server.url;
}

function loadAsFile(key, callback){
	MongoClient.connect(srvUrl, function(err, db) {
		if(!err) console.log("We are connected");
		else throw err;
		db.collection(key).find().sort({"_id":1}).toArray(function(err, items){ 
			callback('v_'+key+'.txt', items);
		});
	});
}

// function createMongoSync(coll, table){
	// table['^\/'+coll] = function(req, res, data){ 
		// function callback(result){
			// if(result != undefined){
				// res.writeHead(200, {"Content-Type": ctype["json"]});
				// if(result != 1) {res.write(JSON.stringify(result));}
			// }else{
				// res.writeHead(500);
			// } 
			// res.end();	
		// }
	  	// sync(req, data, coll, callback);
	  // };
// }


function sync(req, data, key, callback){
	console.log("!!!!REQUEST Mongo!!!");
	console.log(["REQUEST method: ", req.method]);
	console.log(["Recive data: ", data]);
	
	controller = null;
	var ret;
	var pathname = url.parse(req.url).pathname;
	
	console.log(pathname);
	if(global.mode !="readonly" && req.method=="POST" && pathname.match('^\/'+key+'$')){ controller=create;}
	if(global.mode !="readonly" && req.method=="PUT" && pathname.match('^\/'+key+'\/\\w{1,25}')){ controller=change;}
	if(global.mode !="readonly" && req.method=="DELETE" && pathname.match('^\/'+key+'\/\\w{1,25}$')){ 
		data = pathname.match('^\/'+key+'\/(\\w+){1,25}', pathname)[1];
		controller=remove;
		}
	if(req.method=="GET" && pathname.match('^\/'+key+'\/\\w{1,25}$')){ 
		data = pathname.match('^\/'+key+'\/(\\w+){1,25}', pathname)[1];
		controller=get;
		}	
	if(req.method=="GET" && pathname.match('^\/'+key+'$')){ controller=getAll;}	
	
	MongoClient.connect(srvUrl, function(err, db) {
			if(!err) {
				console.log("We are connected");
			}else{throw err}
			var coll = db.collection(key);
			if ('function' == typeof controller) controller(coll, data,callback);
			else {
				console.log("Error: NO CONTROLLER to:" +  pathname);
				callback();
			}
		});
}
	function create(coll, data, callback){
		coll.insert(data, {w:1}, function(err, result) {
			if (err) throw err;
			console.log(["Create in base result:", result]);
			callback(result[0]);
 			});
	}
	function change(coll, data, callback){
		console.log(['CHANGE data in base request:', data]);
		var val=data;
		var s = new ObjectID(val._id);
		val._id = s;
		coll.save(val, {w:1}, function(err, result) {
			if (err) throw err;
			callback(1);
		});
	}
	function remove(coll, data, callback){
		console.log(['REMOVE data from base request:', data]);
		var s = new ObjectID(data);
		coll.remove({_id: s}, {w:1}, function(err, result) {
			if (err) throw err;
			console.log(["REMOVE data from base result:", result]);
			callback(1);
		});
	}
	function get(coll, data, callback){
		console.log(['GET data from base request:',data]);
		var s = new ObjectID(data);
		coll.find({_id: s}).toArray(function(err,items){
			if(err){
				console.log("ERROR mongodb:get internal");
				callback();
				return; 
			}
			if(items.length == 0){
				console.log("ERROR mongodb:get data not find");
				callback();
				return; 
			} 
			callback(items[0]);
			console.log(items[0]);
			});
						
	}
	function getAll(coll, data, callback){
		console.log(['GET ALL data from base request:']);
		coll.find().sort({"_id":1}).toArray(function(err,items){ 
			if(err) throw err;
			if(items.length == 0){
				console.log("ERROR mongodb:getAll data not find");
				callback();
				return; 
			} 
			callback(items);
			});
	}


exports.loadAsFile=loadAsFile;
exports.init=initMongo;
exports.sync=sync;