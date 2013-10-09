var url = require("url");
var fs = require("fs");
var ObjectID = require('mongodb').ObjectID;
var mongo = require('mongodb');
var _ = require("underscore");

var db = null;

global.models = [];

function log_args(){
    console.log(arguments);
}

function QuerySet(cursor){
    this.cursor = cursor;
}
function $(){ return db.collection(this.model_name); }
var db_queryset_extend = {
    sort: function(){
        return this;
    },
    limit: function(){
        return this;
    },
    offset: function(){
        return this;
    },
    find: function(){
        return this;
    },
    not: function(){
        return this;
    },
    eval: function(callback){
        this.cursor.toArray(callback)
        return this;
    }
}
var db_model_extend = {
    get: function(id,callback){
        if (!id) {
            throw Error("No id specified");
        }
        var id = new ObjectID(id);
        cursor = $.call(this).find({_id: id});
        cursor.toArray(callback);
    },
    find: function(where_clause){
        cursor = $.call(this).find({_id: id});
        return (new QuerySet(cursor));
    },
    eval: function(callback){
        $.call(this).find({}).toArray(callback);
    },
    
    
    
    all: function(){
    	var cursor= $.call(this).find();
    	return new QuerySet(cursor);
    },
    del: function(){
    	
    },   
    exclude: function(where_clause){ // исключить
    	
    },
    add: function(where_clause){
    	  $.call(this).insert();
    },
    limit: function(){

    },
    offset: function(){

    }
    
    
    
}

var db_objet_extend = {
    save: function(callback){
        var _this = this;
        if (!this.id) {
            this.id = new ObjectID();
            this.attributes._id = this.id;
        }
        $.call(this).insert(this.attributes,{},function(err,obj){
            _this.attributes = obj[0];
            callback(err,_this);
        });
        return this;
    },
    delete: function(){
        if (!this.id) {
            $.call(this).remove({_id:this.id},{},log_args);
            return this;
        }
        return this;
    },
    get: function(key){
        this.attributes[key];
    },
    set: function(key,val){
        if ('object' == typeof key) _.extend(this.attributes,key);
        else this.attributes[key] = val;
        return this;
    }
}

module.exports = {
    extend: function(model){
        if ('function' != typeof model){
            throw Erro("Wrong model object type: should be a function");
        }
        var _sch = model.scheme;
        var model_name = model.toString().replace(/^function\s+/,"").replace(/\([\s\S]*\)\{[\s\S]*$/,"");
        if(model_name in global["models"]){
            return global["models"][model_name];
        }
        var _model = model
        model = function(obj){
            this.attributes = {};
            if ('object' == typeof obj)
                this.set(obj);
        };
        model.scheme = _sch;
        model.model = model;
        model.model_name = model_name;
        model.prototype.model_name = model_name;
        model.prototype.model = model;
        _.extend(model,_model);
        _.extend(model.prototype,db_objet_extend);
        model.prototype.url = function() {
            return model.url+"/"+this.id.toString()
        }
        _.extend(model,db_model_extend);
        return model;
    },
    creationDate: function(){
        return new Date();
    },
    init_db: function(callback){
        mongo.MongoClient.connect("mongodb://127.0.0.1/Kotusov", function(err, dbObj) {
            if(err) throw err;
            global.db = dbObj;
            db = dbObj;
            callback();
        });
    }
};