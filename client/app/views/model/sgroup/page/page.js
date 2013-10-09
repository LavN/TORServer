window.PageSgroupModelView = ModelView.extend({
  template: "page_sgroup",
  __render: function(){
  		var _=this;
  		var al= this.model.get("alias");
  		function render(crs){
  			var s = subject_collection.where({"sgroup":al, "course":crs});
  			if(crs == "4") s = subject_collection.where({"sgroup":al, "course":crs, "studyp":"012"});
  			if(!s.length){_.$('#crs'+crs).hide(); return;}
  			var i=0;
	  		for(i=0;i<s.length;i++){
	  			var v = new Sbj_refActionView(s[i]);
	  			var tag = '#c'+crs+'s'+s[i].get("semestr");
	  			_.$(tag).append(v.$el);
	  		}
  		}
  		render("1");
  		render("2");
  		render("3");
  		render("4");
  		render("5");
  		render("6");
  		_.$('.line_s:has(ul.list_block:empty)').hide();
  		// console.log(_.$('div:(ul.list_block:empty)'));
  		
  		var pr = subject_collection.where({"sgroup":al, "type":"practice"});
  		var i=0;
  		for(i=0;i<pr.length;i++){
  			var v = new Option_refActionView({name:pr[i].get("name"),url:"/"+pr[i].get("sgroup")+pr[i].get("url")});
  			_.$('#practice').append(v.$el);
  		}
  		var d = subject_collection.where({"sgroup":al, "type":"diplom"});
  		var i=0;
  		for(i=0;i<d.length;i++){
  			var v = new Option_refActionView({name:d[i].get("name"),url:"/"+d[i].get("sgroup")+d[i].get("url")});
  			_.$('#diplom').append(v.$el);
  		}
  		var d = subject_collection.where({"sgroup":al, "type":"gos"});
  		var i=0;
  		for(i=0;i<d.length;i++){
  			var v = new Option_refActionView({name:d[i].get("name"),url:"/"+d[i].get("sgroup")+d[i].get("url")});
  			_.$('#gos').append(v.$el);
  		}
  		var d = subject_collection.where({"sgroup":al, "type":"olymp"})[0];
		if(d){
			var v = new Option_refActionView({name:d.get("name"),url:d.get("url")});
			_.$('#olymp').append('<a class="olymp_sgroupref" data-route='+'"'+d.get("url")+'">'+d.get("name")+'</a>');
  		}
  }
    
});