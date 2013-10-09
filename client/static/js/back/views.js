window.View = Backbone.View.extend({
    initialize:function(context){
        this.context = context;
        if (typeof this.init == "function") this.init.apply(this,arguments);
    },
    render:function(){
        var tagname = this.tagName || "div"
        var $el = $("<"+tagname+" />");
        if (this.template){
            $el.append($("script#"+this.template+"_"+this.view_type+"_template").jqote(this.context));

        }
        $el.addClass(this.template?this.template+"_"+this.view_type:"");
        $el.addClass(this.className);
        this.setElement($el);
        if ('function' == typeof this.__set__) this.__set__();
        if ('function' == typeof this.rendered) this.rendered($el);
        if ('function' == typeof this.__render) this.__render();
    }
});

window.CollectionView = View.extend({
    id: "wrong",
    initialize: function(collection){
        this.view_type = "collection";
        this.collection = collection;
        this.child_models = {};
        View.prototype.initialize.apply(this,arguments);
        this.context = this.collection.models;
        this.render();
        this.listenTo(collection,"sync",this.update_collection);
        this.listenTo(collection,"add",this.add_to_collection);
    },
    __set__:function(){
        this._keep_children = this.$el.children()
        this.update_collection(this.collection);
    },
    add_to_collection: function(obj){
        var model = obj;
        if (this.$el.children("#"+model.id).length == 0){
            var $model_view = new this.model_view(model);
            $model_view.$el.hide();
            this.$el.prepend($model_view.$el);
            this.child_models[model.id] = $model_view;
            $model_view.$el.fadeIn();
        }
    },
    update_collection: function(collection){
        var _ = this;
        if (!this.model_view){
            throw Error("No model view specified");
        }
        var in_collection = []
        for(var i in collection.models){
            var model = collection.models[i];
            in_collection.push("#"+model.id)
        }
        var to_remove = this.$el.children().not(in_collection.join(", "));
        this._keep_children.each(function(){
            to_remove = to_remove.not(this);
        })
        to_remove.each(function(){
            _.child_models[$(this).attr("id")].remove();
            delete _.child_models[$(this).attr("id")];
        });
        var $model_view = null;
        for(var i in collection.models)
        {
            var model = collection.models[i];
            if (this.$el.children("#"+model.id).length == 0){
                $model_view = new this.model_view(model);
                $model_view.$el.hide();
                this.$el.prepend($model_view.$el);
                this.child_models[model.id] = $model_view;
                $model_view.$el.fadeIn();
            }
        }
    },
    remove: function(){
        if (!this.collection.keep) delete window[this.collection.sync_name];
        delete this.collection;
        View.prototype.remove.call(this)
    }

});

function update_model_view(attrs){
    if (this.$el.find("[data-attr]").length != 0){
        for(i in attrs){
            if (!this.model.get(i)) continue;
            $sub_el = this.$el.find("[data-attr='"+i+"']");
            if (!$sub_el.length) continue;
            if ($sub_el[0].tagName == "INPUT") $sub_el.val(this.model.get(i));
            else if ($sub_el[0].tagName == "IMG"){
                if (!this.model.get(i)){
                    $sub_el.remove();
                }
                else $sub_el.attr("src",this.model.get(i));
            }
            else $sub_el.text(this.model.get(i));
        }
    }
    if (this.$el.find("[data-attr-src]").length != 0){
        for(i in attrs){
            if (!this.model.get(i)) continue;
            $sub_el = this.$el.find("[data-attr-src='"+i+"']");
            if (!$sub_el.length) continue;
            else $sub_el.attr("src",this.model.get(i));
        }
    }
    if (this.$el.find("[data-attr-href]").length != 0){
        for(i in attrs){
            if (!this.model.get(i)) continue;
            $sub_el = this.$el.find("[data-attr-href='"+i+"']");
            if (!$sub_el.length) continue;
            else $sub_el.attr("href",this.model.get(i));
        }
    }
}

window.ModelView = View.extend({
    initialize: function(model){
        this.view_type = "model";
        this.model = model;
        View.prototype.initialize.apply(this,arguments);
        this.context = this.model.attributes;
        this.listenTo(model,"change",this.__update__);
        this.render();
    },
    __set__: function(){
    	this.$el.attr("id",this.model.id);
        update_model_view.call(this,this.model.attributes)
    },
    __update__:function(a,b,c){
        update_model_view.call(this,this.model.changedAttributes())
    },
    remove: function(){
        if (!this.model.collection){
            delete window[this.sync_name];
        }
        View.prototype.remove.call(this)
    }
});

window.ActionView = View.extend({
    initialize: function(context){
        this.view_type = "action";
        View.prototype.initialize.apply(this,arguments);
        this.render();
    },
    remove: function(){
        View.prototype.remove.call(this)
    }
});

window.LayoutView = View.extend({
    initialize:function(blocks){
        this.blocks = blocks || {};
        this.view_type = "layout";
        View.prototype.initialize.apply(this,arguments);
        this.render();
    },
    __set__:function(){
        for(var i in this.blocks){
            var block = this.blocks[i];
            this.$el.find("#"+i).html("");
            this.$el.find("#"+i).append(block.$el);
        }
    },
    update:function(blocks){
        var prev_block = this.blocks || {};
        for(var i in blocks){
            var block = blocks[i];
            if (i in prev_block) {
                prev_block[i].remove();
            }
            this.blocks[i] = blocks[i];
            this.$("#"+i).html("");
            this.$("#"+i).append(block.$el);
        }
        return this;
    },
    remove: function(){
        for(var i in this.blocks){
            if (this.blocks[i]) this.blocks[i].remove();
        }
        View.prototype.remove.call(this);
    }
});

window.ApplicationView = View.extend({
    initialize: function(){
        this.view_type = "layout";
        this.target = this.target || "body";
        this.layouts = {};
        View.prototype.initialize.apply(this,arguments);
        this.render();
    },
    __set__:function(){
        this.$target = this.$el.find("#"+this.target);
    },
    add: function(view){
        var wrong_flag = true;
        var view_classes = view.el.className.split(/\s+/);
        for(var i in view_classes){
            if (view_classes[i].endsWith("_page_layout")) {
                wrong_flag = false;
                break;
            }
        }
        if (wrong_flag){
            throw Error("Can't add not page_layout view to ApplicationView");
        }
        this.layouts[view.template] = view;
        view.$el.hide();
        this.$target.append(view.$el);
    },
    show: function(name){
        if (!(name in this.layouts)){
            throw Error("This page is not in ApplicationView"+name);
        }
        if ('function' == typeof this.beforeShow) this.beforeShow();
        for(var i in this.layouts){
            if (i == name){
                if ('function' == typeof this.showAction)
                    this.showAction(this.layouts[i].$el);
                else this.layouts[i].$el.show();
            }
            else{
                if ('function' == typeof this.hideAction)
                    this.hideAction(this.layouts[i].$el);
                else this.layouts[i].$el.hide();
            }
        }
        if ('function' == typeof this.postShow) this.postShow();
    },
    showOver: function(name){
    	if (!(name in this.layouts)){
            throw Error("This page is not in ApplicationView"+name);
        }
       	this.layouts[name].$el.show();
    }
});














