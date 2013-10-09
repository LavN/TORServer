var app = global.app,
    fs = require("fs"),
    path = global.path
;

var pre_wrapper = {
    "less": "\t.#{id} {\n\tposition: relative;\n\t\t#{data}\n}",
    "css": "\t.#{id} {\n\tposition: relative;\n\t\t#{data}\n}"
};

var post_wrapper = {
    "less": "\n<!-- #{name} -->\n<style>\n#{data}\n</style>\n",
    "css": "\n<!-- #{name} -->\n<style>\n#{data}\n</style>\n",
    "js": "\n<!-- #{name} -->\n<script>\n#{data}\n</script>\n",
    "coffee": "\n<!-- #{name} -->\n<script>\n#{data}\n</script>\n",
    "jade": "\n<!-- #{name} -->\n<script type='text/x-template-jqote' id='#{id}_template'>\n#{data}\n</script>\n",
    "html": "\n<!-- #{name} -->\n<script type='text/x-template-jqote'id='#{id}_template'>\n#{data}\n</script>\n",
    "jqote": "\n<!-- #{name} -->\n<script type='text/x-template-jqote' id='#{id}_template'>\n#{data}\n</script>\n"
}

function prepare(name,data,arr){
    if (data.length == 0) return "";
    var extension_name = name.substr(name.lastIndexOf(".")+1);
    var id = name.substr(0,name.lastIndexOf("/"));
    id = id.split("/").reverse().join("_").toLowerCase();
    if (extension_name in arr){
        return arr[extension_name].replace("#{data}",data.replace(/\n/g,"\n\t")).replace("#{name}",name).replace("#{id}",id);
    }
    return data;
}

module.exports = {
    exec: function(name,callback){
        var template_name = name.replace(path+"/","");
        var views_name = template_name.replace("client/app/views/","");
        var extension_name = template_name.substr(template_name.lastIndexOf("."));
        var templ_data = prepare(views_name,fs.readFileSync(name,"utf-8"),pre_wrapper);
        if (extension_name in app.engines){
            var temp_file_name = "app/views/temp_"+Math.floor(Math.random()*100000)+"_"+template_name.substr(template_name.lastIndexOf("/")+1);
            var fd = fs.openSync("client/"+temp_file_name,"w+");
            fs.writeSync(fd,templ_data,0,0,0,0);
            fs.close(fd);
            app.render(temp_file_name,function(e,data){
                if (e){
                    console.log(e);
                    fs.unlink("client/"+temp_file_name);
                    throw e;
                }
                callback(name,prepare(views_name,data,post_wrapper));
                fs.unlink("client/"+temp_file_name);
            });
            return;
        }
        callback(name,prepare(views_name,templ_data,post_wrapper));
    }
}