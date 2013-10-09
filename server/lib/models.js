var fs_ext = require("./utils/fs_ext.js"),
    db_drive = require("./db/database.js")
;

module.exports = {
    init: function(){
        fs_ext.tree(global.path+"/server/app/models",function(files){
            global.models = {};
            global.url_access = {};
            for(var i in files){
                var model = require(files[i]);
                if (typeof model == 'function'){
                    model = db_drive.extend(model);
                    global.models[model.model_name] = model;
                    global.url_access[model.url] = model;
                }
            }
        });
    }
}