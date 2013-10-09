window.BoxSgroupModelView = ModelView.extend({
  template: "box_sgroup",
  __render: function(){
  		if(this.model.get("alias")=="engineer") this.$('.mod-box').css("background-image", "url(\"/static/img/eng_back.jpg\")");
		if(this.model.get("alias")=="bachelor"){
			// this.$('.lolo').attr({"href":this.model.get("url")});
			this.$('.mod-box').css("background-image", "url(\"/static/img/bac_back.jpg\")");
		}
		if(this.model.get("alias")=="master") this.$('.mod-box').css("background-image", "url(\"/static/img/mas_back.jpg\")");
  }
    
});