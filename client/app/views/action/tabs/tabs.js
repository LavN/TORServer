window.TabsActionView = ActionView.extend({
  template: "tabs",
  __render: function(){//context{header,toptext,content:{label:body,...},bottomtext}
  		var _ =this;
  		var data = this.context.content;
  		var label;
  		for(label in data){
  			var el = $("<li class=\"tabs_label\" label=\""+label+"\"><a>"+label+"</a></li>")
  			this.$("ul#tabs_labels").append(el);
  		}
  		this.$('.tabs_label').click(function(ev){
  			_.$('.tabs_label').removeClass("active");
  			$(this).toggleClass("active");
  			var $el = _.context.content[$(this).attr("label")];
  			_.$("#tabs_body").html("");
  			if($el) _.$("#tabs_body").append($el);
  			
  		});
  		var first = this.$('li.tabs_label:first');
  		first.toggleClass("active");
  		var $el = _.context.content[first.attr("label")];
  		if($el) _.$("#tabs_body").append($el);
  }
});