var PhotoModel = require("./photo.js")
;

function AlbumModel(){}
AlbumModel.url = "albums";
AlbumModel.scheme = {
    name: {
        type: String,
        default: "",
        nullAllowed: false
    },
    description: {
        type: String,
        default: "",
        nullAllowed: false
    },
    photos: {
        type: [PhotoModel]
    }
};

module.exports = AlbumModel;