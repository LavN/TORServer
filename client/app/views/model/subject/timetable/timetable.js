window.TimetableSubjectModelView = ModelView.extend({
	template : "timetable_subject",
	__render : function() {
		var items = this.model.get("categories").info.block;
		for (var i in items) {
			if (items[i].view == "TableBlock") {
				var tm = table_collection.get(items[i].object);
				if (!tm) {
					console.log("ERR: undefined TableBlockModel " + items[i].object);
					return;
				}
				if (tm.get("html") == ""){
					continue;
				}
				var tv = new AccordionTableBlockModelView(tm);
				tv.setParent("timetable-accordion");
				this.$('#timetable-accordion').append(tv.$el);
			}
		}
	}
}); 