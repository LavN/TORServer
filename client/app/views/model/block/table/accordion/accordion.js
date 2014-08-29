window.AccordionTableBlockModelView = ModelView.extend({
	template : "accordion_table_block",
	__render : function() {
		this.$el.addClass("accordion-group");
		if (this.model.get("html") == ""){
			// this.$("a.accordion-toggle").addClass("disabled");
			return;
		}
		var tv = new TableBlockModelView(this.model);
		this.$(".accordion-inner").append(tv.$el);
		if (this.model.get("flag"))
			this.$(".accordion-body").addClass("in");
	},
	setParent : function(parentId) {
		this.$(".accordion-toggle").attr("data-parent", "#"+parentId)
	}
}); 

