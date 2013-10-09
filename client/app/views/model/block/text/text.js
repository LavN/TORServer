window.TextBlockModelView = ModelView.extend({
  template: "text_block",
  __render: function(){
  		var ps = this.model.get("text").split("</br>");
  		var i=0;
  		for(i=0;i<ps.length;i++){
  			this.$('#text_block_body').append('<p class="text">'+ps[i]+'</p>');
  		}
  		
  		//todo picture
  }
});