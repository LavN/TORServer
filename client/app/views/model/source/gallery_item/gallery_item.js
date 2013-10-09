window.Gallery_itemSourceModelView = ModelView.extend({
  template: "gallery_item_source",
  __render: function(){
		if(this.model.get("description")) this.$('a.gallery-item').attr('title',this.model.get("description"));
		this.$('.gallery-item-pic').mouseenter(function(ev){
			var _=this
			var prnt = $(this).parent();
			prnt.find(".gallery-item-icon").fadeIn();
			prnt.find(".gallery-item-shadow-hover").fadeIn();
			
		});
		this.$('.gallery-item-pic').mouseleave(function(ev){
			var prnt = $(this).parent();
			prnt.find(".gallery-item-shadow-hover").fadeOut();
			prnt.find(".gallery-item-icon").fadeOut();
			
			
			
		});
  }
});