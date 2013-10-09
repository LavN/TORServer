var db_drive = require("../../lib/db/database.js"),
    PhotoModel = require("./photo.js")
;

function NewsModel(){}
NewsModel.url = "news";
NewsModel.scheme = {
    pub_date: {
        type: Date,
        default: db_drive.creationDate,
        nullAllowed: false
    },
    title: {
        type: String,
        default: "",
        nullAllowed: false
    },
    summary: {
        type: String,
        default: "",
        nullAllowed: true
    }
};

module.exports = NewsModel;