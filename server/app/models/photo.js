var db_drive = require("../../lib/db/database.js"),
    PortfolioModel = require("./portfolio.js"),
    AlbumModel = require("./album.js")
;


function PhotoModel(){}
PhotoModel.url = "photos";
PhotoModel.scheme = {

    url: {
        type: String,
        nullAllowed: true,
        validateion: []
    },
    portfolio: {
        type: PortfolioModel,
        nullAllowed: true
    },
    album: {
        type: AlbumModel,
        nullAllowed: true
    },
    pub_date: {
        type: Date,
        default: db_drive.creationDate,
        nullAllowed: false
    }
};

module.exports = PhotoModel;