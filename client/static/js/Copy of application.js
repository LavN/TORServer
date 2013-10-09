window.data_loaded = function(){
//	var json_category_temp ={news:{name:"Новости",url:"/news",block:[]}, info:{name:"Информация",url:"/info",block:[]}, lecture:{name:"Лекции",url:"/lecture",block:[]}, practice:{name:"Практика",url:"/practice",block:[]} };
	
	
	window.app_layout = new ApplicationLayout();
	window.home_page_layout = new HomePageLayout({home_page_body: (new TableSgroupCollectionView(sgroup))});
  	app_layout.add(home_page_layout);

	function createSgroupModel(attr){
		var m = new SgroupModel(attr);
		m.save();
	}
	
//	createSgroupModel({sform:"Дневная форма обучения",name:"Специалитет",alias:"engineer",url:"/engineer"});
//	createSgroupModel({sform:"Дневная форма обучения",name:"Бакалавриат",alias:"bachelor",url:"/bachelor"});
//	createSgroupModel({sform:"Дневная форма обучения",name:"Магистратура",alias:"master",url:"/master"});
//	createSgroupModel({sform:"Вечерняя форма обучения",name:"Бакалавриат(вечернее)",alias:"v_bachelor",url:"/v_bachelor"});
//	createSgroupModel({sform:"Вечерняя форма обучения",name:"Магистратура(вечернее)",alias:"v_master",url:"/v_master"});

	
	function createSubjectModel(attr){
		var m = new SubjectModel();
		m.save(attr,{success:function(m){
			var sg = sgroup.where({"alias":m.get("sgroup")})[0];
			var ss = sg.get("subjects");
			ss[m.get("alias")]=m.id;
			sg.save();
		}})
		return m;
	}
//	createSubjectModel({"abb":"ПТРИ", "name":"Приборы и техника радиоизмерений","alias":"ptri","url":"/engineer/ptri","sgroup":"engineer","course":"4",categories:json_category_temp})
//	createSubjectModel({"abb":"ПТРИ", "name":"Приборы и техника радиоизмерений","alias":"ptri","url":"/bachelor/ptri","sgroup":"bachelor","course":"4",categories:json_category_temp})
//	createSubjectModel({"abb":"ОМРИ", "name":"Основы метрологии и радиоизмерений","alias":"omri","url":"/engineer/omri","sgroup":"engineer","course":"2",categories:json_category_temp})
//	createSubjectModel({"abb":"ОМРИ", "name":"Основы метрологии и радиоизмерений","alias":"omri","url":"/bachelor/omri","sgroup":"bachelor","course":"2",categories:json_category_temp})
	function createTextBlockModel(attr,path){
		var m = new TextBlockModel();
		m.save(attr,{success:function(m){
			// text_collection.add(m);
			var p = path.split("/");
			var s = subject_collection.where({"alias":p[1],"sgroup":p[0]})[0];
			var arr = s.get("categories");
			attr.blocktype="text";
			attr.m_id=m.id;
			// arr[p[2]].block=[];
			arr[p[2]].block.push(attr);
			s.set({"categories":arr});
			s.save();
		}})
		return m;
	}
	// createTextBlockModel({},"engineer/ptri/info");

	function createNewsBlockModel(attr,path){
		var m = new NewsBlockModel();
		m.save(attr,{success:function(m){
			// news_collection.add(m);
			var p = path.split("/");
			var s = subject_collection.where({"alias":p[1],"sgroup":p[0]})[0];
			var arr = s.get("categories");
			// arr.news.block=[];
			attr.blocktype="news";
			attr.m_id=m.id;
			arr.news.block.push(attr);
			s.set({"categories":arr});
			s.save();
		}})
		return m;
	}
	
	// createNewsBlockModel({},"engineer/ptri/news");
	// createNewsBlockModel({},"engineer/ptri/news");
	// createNewsBlockModel({},"engineer/ptri/news");
	
	function createListBlock(attr,path){ // attr={header:"lolo",items:{}}
		var p = path.split("/");
		var s = subject_collection.where({"alias":p[1],"sgroup":p[0]})[0];
		var arr = s.get("categories");
//		arr[p[2]].block=[];
		attr.blocktype="list";
		arr[p[2]].block.push(attr);
		s.set({"categories":arr});
		s.save();
	}
//	createListBlock({header:"Название списка", view_type:"light", items:[]},"engineer/ptri/practice");
//	createListBlock({header:"Название списка2", view_type:"full", items:[]},"engineer/ptri/practice");

	function createSourceModel(attr,path){ //"engineer/ptri/practice/listname"
		var m = new SourceModel();
		m.save(attr,{success:function(m){
			// source_collection.add(m);
			var p = path.split("/");
			var s = subject_collection.where({"alias":p[1],"sgroup":p[0]})[0];
			var arr = s.get("categories");
			var i=0;
			for(i=0;i<arr[p[2]].block.length;i++){
				if(arr[p[2]].block[i].header==p[3]){
					arr[p[2]].block[i].items.push(m.id);
					break;
				}
			}
			s.set({"categories":arr});
			s.save();
		}})
		return m;
	}
//	createSourceModel({name:"Название ресурса2",description:"Это такая хорошая книжка её нужно обязательно скачать и прочитать.",pic:"/static/img/source_def.jpg",url:{doc:"/downloads/filename.doc",pdf:"/downloads/filename.pdf"}},"engineer/ptri/practice/Название списка2");

	function addTextBlockModelId(path,id){
			var p = path.split("/");
			var s = subject_collection.where({"alias":p[1],"sgroup":p[0]})[0];
			var arr = s.get("categories");
			attr.blocktype="text";
			attr.m_id=m.id;
			// arr[p[2]].block=[];
			arr[p[2]].block.push(attr);
			s.set({"categories":arr});
			s.save();
	}

	function load_template(temp_url){
		var a =$.ajax({dataType:"json", url:temp_url, type:'GET', success:function(res){ 
			console.log(res)
			var subject =new SubjectModel(res);
			console.log(subject);
			return subject;
		}});
	}

	load_template("/static/temp/subject.json");

	

	
	
	window.page404 = new Eror404Layout();
  	app_layout.add(page404);

	window.sgroup_page = new SgroupLayout();
	app_layout.add(sgroup_page);
	window.subject_page = new SubjectLayout();
	app_layout.add(subject_page);
	
	$(function(){window.app_layout.$el.appendTo("body");});
	
	
	
	
	
					
}
