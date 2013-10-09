window.Collection = Backbone.Collection.extend({
    initialize: function(){
        var _ = this;
        this.sync_name = "col_"+Math.floor(Math.random()*10000)
        window[this.sync_name] = this;
        setTimeout(function(){
            for(var i in window){
                if ((window[i] == _) && (i != _.sync_name)){
                    delete window[_.sync_name];
                    _.sync_name = i;
                }
            }
        },0);
        if (typeof this.init == "function") this.init.apply(this,arguments);
    }
});