window.TableBlockModelView = ModelView.extend({
  template: "table_block",
  __render: function(){
  		var url = this.model.get("src");
  		if(url){
  			if(url.match(/\.pdf$/)) this.$('#source').append('<a href=\"'+url+'\">'+'<img class="source_icon" src="/static/img/icon_pdf.gif")></a>');
  			if(url.match(/\.doc$/)) this.$('#source').append('<a href=\"'+url+'\">'+'<img class="source_icon" src="/static/img/icon_word.jpg")></a>');
  			if(url.match(/\.zip$/)) this.$('#source').append('<a href=\"'+url+'\">'+'<img class="source_icon" src="/static/img/icon_wzip.gif")></a>');

  		}else(this.$("#source").hide());
  		
  		this.$("#table").html(this.model.get("html"));
  		
  }
});