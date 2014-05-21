window.Gallery_blockActionView = ActionView.extend({
  template: "gallery_block",
  __render: function(){
  		this.$('.kepstrRef').attr("href", "http://www.kepstr.eltech.ru/tor/rtcs/olymp/"+this.context.alias+"/page_01.htm");
		// var items =this.context.object; 
		// var k=0;
		// for(k=0;k<items.length;k++){
				// var s_model = source_collection.get(items[k].object);
				// if(!s_model){console.log("ERR: undefined SourceModel");return;}
				// if(items[k].view=="GallerySource") this.$('#pic'+k).append((new Gallery_itemSourceModelView(s_model)).$el);	
				// if(k==2) break;
// 				
		// }
		// this.$('a.gallery-item').attr("rel",this.context.alias);
		// this.$('a.gallery-item').colorbox({maxHeight:'90%',maxWidth:'90%' ,rel:this.context.alias});
		// // this.$('.more').attr("href",this.context.url);
  }
});