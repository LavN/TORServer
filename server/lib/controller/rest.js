function create(callback,model,data){
    var a = new model(data)
    a.save(function(e,obj){
        callback(obj.attributes);
    });
}

function edit(ccallback,model,object,data){
    console.log("edit",arguments);
    var a = model.get(object);
    a.set(data);
    a.save(function(){
        callback(obj.attributes);
    })
}
function del(callback,model,object){
    var a = model.get(object);
    callback(a.attributes);
}
function get(callback,model,object){
    var a = model.get(object);
    callback(a.attributes);
}
function index(callback,model){
    console.log("index",arguments);
}

function callback(ret,req,res){
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(ret));
}

module.exports = function(descr,req,res,action_list){
    var action = null;
    if(req.method == "POST" && !descr.object) action=create;
    if(req.method == "PUT" && descr.object) action=edit;
    if(req.method == "DELETE" && req.object) action=del;
    if(req.method == "GET"){
        if (descr.object) action = get;
        else action = index;
    }
    if (!action) {
        req,statusCode = 500;
        req.end("Wrong request");
    }
    action(function(data){
        callback(data,req,res)
    },global.url_access[descr.model],descr.object?descr.object:req.body,req.body);
}