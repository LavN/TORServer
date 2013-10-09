window.BlockActionView = ActionView.extend({
  template: "block",
  __render: function(){
  		var _ =this;
  		var m = this.context.block;
  		var i=0;
  		for(i=0;i<m.length;i++){
  			var j=0;
  			if(typeof(m[i])=="object"){
	  				if(m[i].view == "NewsBlock"){
	  					var n_model = news_collection.get(m[i].object); 
	  					if(!n_model){console.log("ERR: undefined NewsBlockModel");return;}
	  					this.$('#block_body').append((new NewsBlockModelView(n_model)).$el); 
	  					continue;
	  				}
	  				if(m[i].view == "TextBlock"){
	  					var txt_model = text_collection.get(m[i].object); 
	  					if(!txt_model){console.log("ERR: undefined TextBlockModel");return;}
	  					if(txt_model.get("view") == "PictureTextBlock") this.$('#block_body').append((new PictureTextBlockModelView(txt_model)).$el); 
	  					else this.$('#block_body').append((new TextBlockModelView(txt_model)).$el); 
	  					continue;
	  				}
	  				if(m[i].view == "ListBlock"){
	  					var list_block = new ListActionView({header:m[i].header});
	  					var items = m[i].object;
	  					var k=0;
	  					for(k=0;k<items.length;k++){
	  						if(items[k].view.match("Source")!=null){
		  						var s_model = source_collection.get(items[k].object);
		  						if(!s_model){console.log("ERR: undefined SourceModel");return;}
		  						if(items[k].view=="LightSource") list_block.$el.append((new LightSourceModelView(s_model)).$el);	
		  						if(items[k].view=="FullSource") list_block.$el.append((new FullSourceModelView(s_model)).$el);	
		  					}
	  					}
	  					this.$('#block_body').append(list_block.$el);
	  					continue;
	  				}
	  				if(m[i].view == "TableBlock"){
	  					var t_model = table_collection.get(m[i].object); 
	  					if(!t_model){console.log("ERR: undefined TableBlockModel");return;}
	  					this.$('#block_body').append((new TableBlockModelView(t_model)).$el); 
	  					continue;
	  				}	
	  				if(m[i].view == "TabsBlock"){
	  					var content = {};
	  					var items = m[i].object;
  						var k=0;
	  					for(k=0;k<items.length;k++){
	  						if(items[k].view.match("TableBlock")!=null){
	  							var t_model = table_collection.get(items[k].object);
	  							console.log(t_model);
	  							if(!t_model){console.log("ERR: undefined TableBlockModel");return;}
	  							content[items[k].label]=(new TableBlockModelView(t_model)).$el;
		  					}
	  					}
	  					var tabs_block = new TabsActionView({header:m[i].header,content:content});
	  					this.$('#block_body').append(tabs_block.$el);
	  					continue;
	  				}
	  				if(m[i].view == "GalleryBlock"){
	  					var g_item = new Gallery_blockActionView(m[i]);
	  					this.$('#block_body').append(g_item.$el);
	  					continue;
	  				}
  			}
  		}
  }
});