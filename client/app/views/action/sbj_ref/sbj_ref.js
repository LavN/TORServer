window.Sbj_refActionView = ActionView.extend({
  template: "sbj_ref",
  __render: function(){
  	var mdl = this.context;
  	this.$('a').attr("data-route","/edu/"+mdl.get("sgroup")+mdl.get("url"));
  	this.$('a').text(mdl.get("name"));
  	// if(mdl.get("view_class")=="light")this.$('li').css( "list-style-image",'url("/static/img/icon-no-info.jpg")');
  }
    
});