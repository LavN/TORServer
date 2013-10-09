window.PageSgroupModelView = ModelView.extend({
  template: "page_sgroup",
  __render: function(){
  		var _=this;
  		var al= this.model.get("alias");
  		function render(num){
  			var s = subject_collection.where({"sgroup":al, "course":num});
  			if(num == "4") s = subject_collection.where({"sgroup":al, "course":num, "studyp":"012"});
  			if(!s.length){_.$('#hcourse'+num).hide(); return;}
  			var i=0;
	  		for(i=0;i<s.length;i++){
	  			var v = new Sbj_refActionView(s[i]);
	  			var tag = '#course'+num
	  			_.$(tag).append(v.$el);
	  		}
  		}
  		render("1");
  		render("2");
  		render("3");
  		render("4");
  		render("5");
  		render("6");
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