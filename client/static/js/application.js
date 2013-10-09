if ('function' != typeof String.prototype.startsWith){
	String.prototype.startsWith = function(str){
		return !!this.match(RegExp("^"+str.toString()));
	}
}

if ('function' != typeof String.prototype.endsWith){
	String.prototype.endsWith = function(str){
		return !!this.match(RegExp(str.toString()+"$"));
	}
}

window.data_loaded = function(){
	window.id_iter = 0;
	window.obj_iter = 0;
	
	window.app_layout = new ApplicationLayout();
	// window.home_page_layout = new HomePageLayout({carusel:(new CaruselActionView()), home_page_body: (new Sg_listActionView({collection:sgroup}))});
 	window.home_page_layout = new HomePageLayout({home_page_body: (new Sg_listActionView({collection:sgroup}))});
 	app_layout.add(home_page_layout);

	function createSgroupModel(attr){
		var m = new SgroupModel(attr);
		m.save();
	}
//	createSgroupModel({sortid:"1", sform:"day",name:"Бакалавриат",for_students:"бакалавриата",alias:"bachelor",url:"/bachelor"});
//	createSgroupModel({sortid:"0", sform:"day",name:"Специалитет", for_students:"специалитета", alias:"engineer",url:"/engineer"});
//	createSgroupModel({sortid:"2", sform:"day",name:"Магистратура",for_students:"магистратуры",alias:"master",url:"/master"});
//	createSgroupModel({sform:"ev",name:"Бакалавриат",for_students:"бакалавриата",alias:"v_bachelor",url:"/v_bachelor"});
//	createSgroupModel({sform:"ev",name:"Магистратура",for_students:"магистуры",alias:"v_master",url:"/v_master"});
	
	function createSubjectModel(m){
		m.save({},{success:function(m){
				var sg = sgroup.where({"alias":m.get("sgroup")})[0];
				var ss = sg.get("subjects");
				ss[m.get("alias")]=m.id;
				sg.save();
		}})
		return m;
	}
	window.createSubjectModel = createSubjectModel;

	function addModelId(subject, model_id, key){
		key = key.split("/");
		var cat = subject.get("categories");
		if(key.length == 2){ cat[key[0]].block[key[1]].object = model_id;}
		if(key.length == 3){ cat[key[0]].block[key[1]].object[key[2]].object = model_id;}
		id_iter++;
	}
	function load_template(temp_url){
		function save(sbj,m,path){
			m.save({},{success:function(model){
				addModelId(sbj,model.id, path);
			}});
		}
		var a =$.ajax({dataType:"json", url:temp_url, type:'GET', success:function(res){ 
			console.log(res)
			var subject = res;
			var subjectModel=new SubjectModel(res);
			for(name in subject.categories){
				var block = subject.categories[name].block;
				var i=0;
				for(i=0;i<block.length;i++){
					if(block[i].view == "TextBlock"){
						var m = new TextBlockModel(block[i].object);
						var path = name+"/"+i.toString();
						save(subjectModel,m,path);
						obj_iter++;
					}
					if(block[i].view == "NewsBlock"){
						var m = new NewsBlockModel(block[i].object);
						var path = name+"/"+i.toString();
						save(subjectModel,m,path);
						obj_iter++;
						
					}
					if(block[i].view == "TableBlock"){
						var m = new TableBlockModel(block[i].object);
						var path = name+"/"+i.toString();
						save(subjectModel,m,path);
						obj_iter++;
					}
					if(block[i].view == "ListBlock"){
						var arr = block[i].object;
						var j=0;
						for(j=0;j<arr.length;j++){
							if(arr[j].view.match("Source")!=null){
								var m = new SourceModel(arr[j].object);
								var path = name+"/"+i.toString()+"/"+j;
								save(subjectModel,m,path);
								obj_iter++;
							}
						}
					}
					if(block[i].view == "GalleryBlock"){
						var arr = block[i].object;
						var j=0;
						for(j=0;j<arr.length;j++){
							if(arr[j].view.match("Source")!=null){
								var m = new SourceModel(arr[j].object);
								var path = name+"/"+i.toString()+"/"+j;
								save(subjectModel,m,path);
								obj_iter++;
							}
						}
					}
					if(block[i].view == "TabsBlock"){
						
					}
				}
			}
			
			
			console.log(subjectModel);
			window.testm=subjectModel;
		},error:function(obj,err){
			console.log("Error load json");
			console.log(err);
		}});
	}
	window.loadTemplate= load_template;
	// load_template("/static/temp/tt.json");

	window.page404 = new Error404Layout();
  	app_layout.add(page404);

	window.sgroup_page = new SgroupLayout();
	app_layout.add(sgroup_page);
	window.full_subject_page = new FullSubjectLayout();
	app_layout.add(full_subject_page);
	window.light_subject_page = new LightSubjectLayout();
	app_layout.add(light_subject_page);
	
	$(function(){window.app_layout.$el.appendTo("body");});
	
	
	
	
	
					
}
