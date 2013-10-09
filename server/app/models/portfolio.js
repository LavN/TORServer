var PhotoModel = require("./photo.js")
;

function PortfolioModel(){}
PortfolioModel.url = "portfolios";
PortfolioModel.scheme = {
    name: {
        type: String,
        default: "",
        nullAllowed: false
    },
    photos: {
        type: [PhotoModel]
    }
};

module.exports = PortfolioModel;