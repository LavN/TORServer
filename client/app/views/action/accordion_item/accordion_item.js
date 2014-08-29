window.Accordion_itemActionView = ActionView.extend({
  template: "accordion_item",
  __render: function(){
  		var id = this.context.name;
  		var pid = "#"+this.context.parentId;
  		this.$(".accordion-toggle").attr("data-parent", pid).attr("href", "#"+id);
  		this.$(".accordion-body").attr("id", id)
  		if(this.context.flag) this.$(".accordion-body").addClass("in");
  		this.$(".accordion-inner").append(this.context.body);
  }
});
