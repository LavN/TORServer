window.PictureTextBlockModelView = ModelView.extend({
  template: "picture_text_block",
  __render: function(){
		this.$('.row-fluid').append('<div class="span8"> <p class="text">'+this.model.get("text")+'</p></div>');
  		this.$('.row-fluid').append('<div class="span4"> <img src=\"'+this.model.get("img")+'\"></p></div>');
  }
});