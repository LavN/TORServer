window.Sg_listActionView = ActionView.extend({
  template: "sg_list",
  __render: function(){
  		var _=this;
		var collection = this.context.collection;
		// collection=collection.sortBy(function(obj){return obj.get("sortid")});
		// console.log(collection);
		collection.each(function(mod){ 
	    	if(mod.get("sform") == "day") _.$('#sgroup_day').append((new BoxSgroupModelView(mod)).$el); 
	    	if(mod.get("sform") == "ev") _.$('#sgroup_ev').append((new BoxSgroupModelView(mod)).$el);
	    });
  }
    
});