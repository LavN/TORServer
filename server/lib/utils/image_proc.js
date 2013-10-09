var easy = require("easyimage"),
    fs = require("fs")
;

var supported_ftypes = [
    "JPEG",
    "JPG",
    "PNG"
]


// function file_error(file_name,callback,error_msg){
    // var error_msg = error_msg || "Wrong file format";
    // fs.unlink(file_name);
    // callback({errors: [error_msg]});
// }

// module.exports = {
    // checkImage: function(file_name,callback){
        // easy.info(file_name,function(e,obj,stder){
            // var Photo = global.models.PhotoModel;
            // if (e) return file_error(file_name,callback);
            // else {
                // if (supported_ftypes.indexOf(obj.type) == -1) return file_error(file_name,callback);
                // easy.convert({src:file_name,dst:file_name.substr(0,file_name.lastIndexOf(".")+1)+"jpg",quality: 80},function(err,obj){
                    // if(err) return file_error(file_name,callback,"Can't convert file to PNG format");
                    // fs.unlink(file_name);
                    // var m = new Photo({
                            // url: "/uploads/"+obj.name,
                            // pub_date: new Date(),
                            // albums: [],
                            // portfolios: []
                    // });
                    // m.save(function(err,obj){
                        // if (err) return file_error(file_name,callback,"Can't save Photo object in database");
                        // callback({files: [obj.attributes]});
                    // })
                // })
            // }
        // });
    // }
// }

 module.exports = {
    checkImage: function(file_name,callback){
        function file_error(error_msg){
            var error_msg = error_msg || "Wrong file format";
            fs.unlink(file_name);
            // callback({errors: error_msg});
        }

        easy.info(file_name,function(e,obj){
            var cropwidth = 1800, cropheight = 1200,
                thumbwidth = 300, thumbheight = 150;
            if (obj.width > obj.height){
                cropheight = obj.height*cropwidth/obj.width;
                thumbheight = obj.height*thumbwidth/obj.width;
            }
            else {
                cropwidth = obj.width*cropheight/obj.height;
                thumbwidth = obj.width*thumbheight/obj.height;
            }
            // var Photo = global.models.photo;
            if (e) return file_error("Something wrong happened");
            else {
                if (supported_ftypes.indexOf(obj.type) == -1) return file_error("File type is not supported");
                easy.convert({src:file_name,dst:file_name.substr(0,file_name.lastIndexOf(".")+1)+"jpg",quality: 75},function(err,obj){
                    if(err) return file_error("Can't convert file to JPG format");
                    easy.resize({src:"uploads/"+obj.name,dst:"uploads/"+obj.name,height:cropheight,width:cropwidth},function(err,resized){
                        if(err) return file_error("Can't resize image");
                        easy.resize({src:"uploads/"+obj.name,dst:"uploads/thumb_"+resized.name,height:thumbheight,width:thumbwidth},function(err,thumb){
                            if(err) return file_error("Can't create thumbnail");
                            // var m = new Photo({
                                // url: "/uploads/"+resized.name,
                                // thumb: "/uploads/"+thumb.name,
                                // pub_date: new Date(),
                                // albums: [],
                                // portfolios: []
                            // });
                            // m.save().then(function(obj){
                                // callback(obj.attributes);
                            // },function(e){
                                // file_error("Can't save Photo object in database: "+e);
                            // });
                        });
                    });
                })
            }
        });
    }
}