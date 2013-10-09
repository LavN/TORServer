window.Category_listSubjectModelView = ModelView.extend({
  template: "category_list_subject",
  __render: function(){
  		var cts = this.model.get("categories");
  		if(this.model.get("alias")=="olymp"){
   			for (i in cts){
  			var v = new List_itemActionView({alias:cts[i].alias,name:cts[i].name,url:this.model.get("url")+cts[i].url});
  			this.$('#category_list_body').append(v.$el);
  			} 			
  		}else{  		
  			for (i in cts){
  			var v = new List_itemActionView({alias:cts[i].alias,name:cts[i].name,url:"/edu/"+this.model.get("sgroup")+this.model.get("url")+cts[i].url});
  			this.$('#category_list_body').append(v.$el);
  			}
  		}

  		
  }
    
});