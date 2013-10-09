window.BreadcrumbActionView = ActionView.extend({
  template: "breadcrumb",
  __render: function(){
  		var items = this.context;
  		for(i in items){
  			var li = $("<li><a data-route=\""+items[i].url+"\">"+items[i].text+"</a></li><li id=\"separator\"> / </li>");
  			this.$("ul").append(li);
  		}
  }
    
});