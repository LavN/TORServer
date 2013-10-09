window.Router = Backbone.Router.extend({
    initialize:function(){
        this.on("error",this.error);
       	data_loaded();
    },
    routes: {
        "":"init",
        "home":"home",
        "login":"login",
        "engineer":"engineer",
        "bachelor":"bachelor",
        "master":"master",
        "timetable":"timetable",
        "olymp":"olymp",
        "olymp/:ctg":"olymp/:ctg",
        "olymp/:ctg/:album":"olymp/:ctg/:album",
        "edu/:group":"edu/:group",
        "edu/:group/:sbj":"edu/:group/:sbj",
        "edu/:group/:sbj/:ctg":"edu/:group/:sbj/:ctg",
        "*a":"error"
    },
    "init": function(){
         window.router.navigate("/home",{trigger:true})
    },
    "home": function(){
        app_layout.show("home_page");
        $('.nav_tab').removeClass("selected");
        $('.nav_tab#home').addClass("selected");
    },
    "login": function(){
    	app_layout.show("home_page");
        $('.nav_tab').removeClass("selected");
        $('.nav_tab#home').addClass("selected");
        app_layout.showOver("login_page");
    },
    "edu/:group": function(group){
    	$('.nav_tab').removeClass("selected");
    	var mv = new PageSgroupModelView(sgroup.where({alias:group})[0]);
    	app_layout.layouts["sgroup_page"].update({sgroup_page_body: mv})
        app_layout.show("sgroup_page");
    },
    "edu/:group/:sbj": function(group,sbj){
    	$('.nav_tab').removeClass("selected");
    	var subject = subject_collection.where({alias:sbj, sgroup:group})[0];
    	if(!subject){app_layout.show("404_page"); return;}
    	var bc = new BreadcrumbActionView({g:{url:"/edu/"+group,text: sgroup.where({alias:group})[0].get("name")}});
    	if(subject.get("view_class")=="light"){
    		var cv = new BlockActionView({block:subject.get("categories")["info"].block});
    		app_layout.layouts["light_subject_page"].update({breadcrumb_container: bc, subject_body:cv})
    		app_layout.layouts["light_subject_page"].$("#body_header").text(subject.get("name"))
        	app_layout.show("light_subject_page");
        	return;
    	}
    	if(subject.get("view_class")=="full"){
    		var clv = new Category_listSubjectModelView(subject);
    		var cv;
    		if(subject.get("categories")["news"]){
    			cv = new BlockActionView({block:subject.get("categories")["news"].block});
    			clv.$('li.menu-list-item#news').toggleClass("selected");
    		}
    		else if(subject.get("categories")["info"]){
    			 cv = new BlockActionView({block:subject.get("categories")["info"].block});
    			 clv.$('li.menu-list-item#info').toggleClass("selected");
    			}
    		
    		app_layout.layouts["full_subject_page"].update({breadcrumb_container: bc, subject_category_list: clv, subject_body:cv})
    		app_layout.layouts["full_subject_page"].$("#body_header").text(subject.get("name"))
        	app_layout.show("full_subject_page");
    	}

    },
    "edu/:group/:sbj/:ctg": function(group,sbj,ctg){
    	$('.nav_tab').removeClass("selected");
    	var subject = subject_collection.where({alias:sbj, sgroup:group})[0];
    	if(!subject){app_layout.show("404_page"); return;}
    	var bc = new BreadcrumbActionView({g:{url:"/edu/"+group,text: sgroup.where({alias:group})[0].get("name")}});
    	var clv = new Category_listSubjectModelView(subject);
    	if(!subject.get("categories")[ctg]){app_layout.show("404_page"); return;}
    	clv.$('li.menu-list-item#'+ctg).toggleClass("selected");
    	var cv = new BlockActionView({block:subject.get("categories")[ctg].block});
    	app_layout.layouts["full_subject_page"].$("#body_header").text(subject.get("name"))
    	app_layout.layouts["full_subject_page"].update({breadcrumb_container: bc, subject_category_list: clv, subject_body:cv})
        app_layout.show("full_subject_page");
    },
    "olymp": function(){
    	$('.nav_tab').removeClass("selected");
        $('.nav_tab#olympic').addClass("selected");
    	var subject = subject_collection.where({alias:"olymp"})[0];
    	if(!subject){app_layout.show("404_page"); return;}
    	var clv = new Category_listSubjectModelView(subject);
		var cv = new BlockActionView({block:subject.get("categories")["info"].block});
		clv.$('li.menu-list-item#info').toggleClass("selected");
		app_layout.layouts["full_subject_page"].update({subject_category_list: clv, subject_body:cv})
		app_layout.layouts["full_subject_page"].$("#body_header").text(subject.get("name"))
    	app_layout.show("full_subject_page");
    },
    "timetable": function(){
     	$('.nav_tab').removeClass("selected");
        $('.nav_tab#timetable').addClass("selected");
        app_layout.show("404_page");
        var subject = subject_collection.where({alias:"timetable"})[0];
    	if(!subject){app_layout.show("404_page"); return;}
    	var cv = new BlockActionView({block:subject.get("categories")["info"].block});
		app_layout.layouts["light_subject_page"].update({subject_body:cv})
		app_layout.layouts["light_subject_page"].$("#body_header").text(subject.get("name"))
    	app_layout.show("light_subject_page");
    },
    "olymp/:ctg": function(ctg){
        var subject = subject_collection.where({alias:"olymp"})[0];
    	if(!subject){app_layout.show("404_page"); return;}
    	var clv = new Category_listSubjectModelView(subject);
    	if(!subject.get("categories")[ctg]){app_layout.show("404_page"); return;}
    	clv.$('li.menu-list-item#'+ctg).toggleClass("selected");
    	var cv = new BlockActionView({block:subject.get("categories")[ctg].block});
    	app_layout.layouts["full_subject_page"].$("#body_header").text(subject.get("name"))
    	app_layout.layouts["full_subject_page"].update({ subject_category_list: clv, subject_body:cv})
        app_layout.show("full_subject_page");
        
        
    },
    "olymp/:ctg/:album": function(ctg,album){
    	var ol = subject_collection.where({alias:"olymp"})[0];
    	if(!ol){app_layout.show("404_page"); return;}
    	var clv = new Category_listSubjectModelView(ol);
    	if(!ol.get("categories")[ctg]){app_layout.show("404_page"); return;}
    	var obj = _.find(ol.get("categories")[ctg].block,function(item){if(item.alias == album) return item;});
    	if(!obj){app_layout.show("404_page"); return;}
    	var cv = new GalleryActionView(obj);
    	app_layout.layouts["full_subject_page"].$("#body_header").text(ol.get("name"))
    	app_layout.layouts["full_subject_page"].update({subject_category_list: clv, subject_body:cv})
        app_layout.show("full_subject_page");
    },
    "error": function(){
    	$('.nav_tab').removeClass("selected");
        app_layout.show("404_page");
    }
});

window.sgroup = new SgroupCollection();
window.sgroup.fetch({success:function(){
	window.text_collection = new TextBlockCollection();
	window.text_collection.fetch({success:function(){
			window.source_collection = new SourceCollection();
			window.source_collection.fetch({success:function(){
					window.news_collection = new NewsBlockCollection();	
					window.news_collection.fetch({success:function(){
							window.table_collection = new TableBlockCollection();	
							window.table_collection.fetch({success:function(){
									window.subject_collection = new SubjectCollection();
									subject_collection.fetch({success:function(){
										router = new Router();
										$(function(){
											 Backbone.history.start({pushState: true});
										    $("a[data-route]").live("click",function(){
										        router.navigate($(this).attr("data-route"),{trigger: true});
										    });
										});
									}});
							}});
					}});
			}});
	}});
}});

