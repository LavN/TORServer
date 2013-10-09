//function initMongo(server, scheme){
//    srvUrl = server.url;
//    for (i in scheme.collections){
//        createMongoSync(scheme.collections[i], server.routeTable);
//    }
//}

//function createMongoSync(coll, table){
//    table['^\/'+coll] = function(req, res, data){
//        function callback(result){
//            if(result != undefined){
//                res.writeHead(200, {"Content-Type": ctype["json"]});
//                if(result != 1) {res.write(JSON.stringify(result));}
//            }else{
//                res.writeHead(500);
//            }
//            res.end();
//        }
//        sync(req, data, coll, callback);
//    };
//}


function sync(req, data, key, callback){
    function create(coll, data){
        coll.insert(JSON.parse(data), {w:1}, function(err, result) {
            if (err) throw err;
            callback(result[0]);
        });
    }
    function change(coll, data){
        var val=JSON.parse(data);
        var s = new ObjectID(val._id);
        val._id = s;
        coll.save(val, {w:1}, function(err, result) {
            if (err) throw err;
            callback(1);
        });
    }
    function remove(coll, data){
        var s = new ObjectID(data);
        coll.remove({_id: s}, {w:1}, function(err, result) {
            if (err) throw err;
        });
    }
    function get(coll, data){
        var s = new ObjectID(data);
        coll.find({_id: s}).toArray(function(err,items){
            callback(items[0]);
            console.log(items[0]);
        });

    }
    function getAll(coll){
        coll.find().sort({"_id":1}).toArray(function(err,items){
            if(err) throw err;
            callback(items);
        });
    }

    controller = null;
    var ret;
    var pathname = url.parse(req.url).pathname;
    if(req.method=="POST" && pathname.match('^\/'+key+'$')) {controller=create;}
    if(req.method=="PUT" && pathname.match('^\/'+key+'\/\\w{1,25}')) {controller=change;}
    if(req.method=="DELETE" && pathname.match('^\/'+key+'\/\\w{1,25}$')){
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
        if ('function' == typeof controller) controller(coll, data);
        else {
            throw Error("Wrong request");
        }
    });
}