function getUniq(){
    return Math.floor(Math.random()*9*Math.pow(10,9)+Math.pow(10,9));
}

Backbone.ajax = function(request){
    request.url += "?uniq="+getUniq();
    return $.ajax.apply(Backbone,arguments);
}

window.current_ts = (new Date()).valueOf();

window.Model = Backbone.Model.extend({
    idAttribute: "_id",
    initialize: function(data){
        this.sync_name = "mod_"+Math.floor(Math.random()*10000);
        if (typeof this.init == "function") this.init(data);
        this.on("changed:id",this.__update_object_in_list__);
        this.__update_object_in_list__();
    },
    error: function(){
    },
    __update_object_in_list__:function(){
        if (this.constructor.__objects__){
            delete this.constructor.__objects__[this.previousAttributes()["id"]];
        }
        this.constructor.__objects__[this.id] = this;
    }
},{
    __objects__: {},
    get: function(id,callback){
        var obj = null;
        if(id in this.__objects__){
            obj = this.__objects__[id];
            if (typeof callback == "function") callback(obj);
            return obj;
        }
        obj = new this({id:id});
        obj.fetch({
            success:function(){
                if (typeof callback == "function") callback(obj);
            }
        });
        return obj;
    }
});

window.User = Model.extend({});

window.SubscribeModel = Model.extend({

});

window.RSSSourceModel = Model.extend({
    urlRoot: "/apis/sources/"
});

//RSSSourceModel.get = function(){
//
//}

window.RSSArticleModel = Model.extend({

});