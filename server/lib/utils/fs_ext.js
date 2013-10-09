var fs = require("fs"),
    _ = require("underscore")
;

var app = global.app;
var path = global.path;


var traverse_dir = (function(){
    var counter = 0;
    return function(path,__call__,__compl__,ignore){
        var ignore = ignore || [];
        var dir = fs.readdirSync(path);
        if(dir.length == 0){
            if (counter == 0) __compl__();
            return;
        }
        counter += dir.length;
        for(var i in dir){
            if ((ignore.indexOf(dir[i]) != -1) || (dir[i].replace(/^(temp_[\s\S]*)|(\.+[\s\S]*)|([\s\S]*~)|([\s\S]*\.back)$/,"wrong_file") == "wrong_file"))
            {
                counter--;
                continue;
            }
            (function(file_name){
                fs.stat(file_name,function(stat_err,stat){
                    counter--;
                    if (stat_err) {throw Exception(stat_err);}
                    if (stat.isFile()) __call__(file_name.replace(/\/+/g,"/"),stat);
                    else traverse_dir(file_name,__call__,__compl__,ignore);
                    if (counter == 0) __compl__();

                });})(path+"/"+dir[i]);
        }

    }
})();

module.exports = {
    cat_directory: function(dir,callback){
        var temp = [];
        traverse_dir(dir,function(name){temp.push(name)},function(){
            var counter = temp.length;
            var rendered = [];
            for(var i in temp){
                app.render(temp[i],function(e,data){
                    counter--;
                    if (e) {
                        console.log(e);
                        throw e;
                    }
                    rendered.push(data);
                    if (counter == 0) callback(rendered.join("\r\n"));
                });
            }

        });
    },
    tree: function(path,callback,ignore){
        var ret = [];
        traverse_dir(path,function(name){ret.push(name)},function(){
            callback(_.sortBy(ret,function(name){return name}));
        },ignore);
    },
    traverse_dir: traverse_dir
}