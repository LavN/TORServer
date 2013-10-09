window.GalleryActionView = ActionView.extend({
  template: "gallery",
  __render: function(){
		var items =this.context.object; 
		var row=$("<div class='row-fluid'></div>");
		var k=0;
		for(k=0;k<items.length;k++){
			if(k%3==0){
				// this.$('.foto-grid div.row-fluid:last div.gallery-item-shadow:last').attr("class", "gallery-item-shadow-last");
				this.$('.foto-grid').append("<div class='row-fluid'></div>");
				row = this.$('.foto-grid div.row-fluid:last');
			}
			var s_model = source_collection.get(items[k].object);
			if(!s_model){console.log("ERR: undefined SourceModel");return;}
			if(items[k].view=="GallerySource"){
				row.append((new Gallery_itemSourceModelView(s_model)).$el);
			} 
			this.$('a.gallery-item').attr("rel",this.context.alias);

		}

		this.$('a.gallery-item').colorbox({maxHeight:'90%',maxWidth:'90%' ,rel:this.context.alias});
  }
    
});