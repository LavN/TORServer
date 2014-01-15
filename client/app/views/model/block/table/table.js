window.TableBlockModelView = ModelView.extend({
  template: "table_block",
  __render: function(){
  		var url = this.model.get("src");
  		if(url){
  			if(url.match(/\.pdf$/)) this.$('#source').append('<a href=\"'+url+'\">'+'<img class="source_icon" src="/static/img/icon_pdf.gif")></a>');
  			if(url.match(/\.doc$/)|| url.match(/\.docx$/)) this.$('#source').append('<a href=\"'+url+'\">'+'<img class="source_icon" src="/static/img/icon_word.jpg")></a>');
  			if(url.match(/\.zip$/)) this.$('#source').append('<a href=\"'+url+'\">'+'<img class="source_icon" src="/static/img/icon_wzip.gif")></a>');

  		}else(this.$("#source").hide());
  		if(this.model.get("style") != undefined) this.$(".table-wrap").addClass(this.model.get("style"));
  		this.$(".table-wrap").html(this.model.get("html"));
  		
  }
});