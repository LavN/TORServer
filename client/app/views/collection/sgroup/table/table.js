window.TableSgroupCollectionView = CollectionView.extend({
  model_view: BoxSgroupModelView,
  template: "table_sgroup",
  __render: function(){
	    // var mv = this.model_view;
	    // this.collection.each(function(mod){ 
	    	// console.log(mod);
	    	//if(mod.get("sform") == "Дневная форма обучения") this.$("#sgroup_day").append((new this.model_view({model: mod})).$el); 
	    	//if(mod.get("sform") == "Вечерняя форма обучения") this.$("#sgroup_day").append((new this.model_view({model: mod})).$el);
	    
	    
	    
	    // });
  }
});
  
