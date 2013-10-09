window.LightSourceModelView = ModelView.extend({
  template: "light_source",
  __render:function(){
  		var files = this.model.get("url");
  		if(!files) { return;}
  		if(files.pdf) this.$('li#files').prepend('<a href=\"'+files.pdf+'\">'+'<img class="source_icon" src="/static/img/icon_pdf.gif")></a>');
  		if(files.doc) this.$('li#files').prepend('<a href=\"'+files.doc+'\">'+'<img class="source_icon" src="/static/img/icon_word.jpg")></a>');
  		if(files.zip) this.$('li#files').prepend('<a href=\"'+files.zip+'\">'+'<img class="source_icon" src="/static/img/icon_wzip.gif")></a>');
  }
});