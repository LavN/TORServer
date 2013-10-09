var fs = require("fs"),
    ejs = require("ejs")
    templ_proc = require("./lib/utils/template_proc.js"),
    fs_ext = require("./lib/utils/fs_ext.js"),
    image = require("./lib/utils/image_proc.js"),
    rest = require("./lib/controller/rest.js")
;

var app = global.app;
var path = global.path;



require("./lib/db/database.js").init_db(function(){
    require("./lib/models.js").init();
});

function render_template(templates,target,callback){
    var counter = templates.length;
    for(var i in templates){
        templ_proc.exec(templates[i],function(name,data){
            counter--;
            target.push(data);
            if (counter == 0) callback();
        })
    }
}

function wrong_req(req,res){
    res.statusCode = 500;
    res.end("Wrong request");
}

module.exports = {
    renderIndex: function(req,res){
        app.set("views",path+"/client");
        var rendered_views = [],
            models = null,
            collections = null;
        function model_render(){fs_ext.cat_directory(path+"/client/app/models",function(data){models = data;collection_render();});}
        function collection_render(){fs_ext.cat_directory(path+"/client/app/collections",function(data){collections = data;view_render();});}
        function view_render(){
            fs_ext.tree(path+"/client/app/views/model",function(t){render_template(t,rendered_views,function(){
                    fs_ext.tree(path+"/client/app/views/collection",function(t){render_template(t,rendered_views,function(){
                        fs_ext.tree(path+"/client/app/views/",function(t){render_template(t,rendered_views,finalize)},["model","collection"]);
                    })});
                })});
        }
        function finalize(){
            app.render("index.html",{
                    templates: rendered_views.join(""),
                    models: "<script>"+models+"</script>",
                    collections: "<script>"+collections+"</script>"
                },
                function(e,data){
                    res.end(data);
                }
            );
        }
        model_render();
    },
    api_proc: function(req,res){
        var result = req.path.match(/^\/(\w+?|[\w\/]+?)\/(\w*)(\.(\w+))*$/);
        console.log(req.path);
        if (result.length == 0) return wrong_req(req,res);
        if (!(result[1] in global.url_access)) return wrong_req(req,res);
        var controller_descr = {
            "req_url": result[0],
            "model": result[1],
            "object": result[2],
            "action": result[4],
        }
        rest(controller_descr,req,res);
    },
    uploadFiles: function(req,res){
        var ret = {
            errors: [],
            files: []
        };
        if (!("file" in req.files)){
            ret.errors.push("No file was uploaded")
            return
        }
        image.checkImage(req.files["file"].path,function(obj){
            res.end(JSON.stringify(obj));
        })
    }
}