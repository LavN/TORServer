
function SubjectModel(){}
SubjectModel.url = "sbj";
SubjectModel.scheme = {

    url: {
        type: String,
        nullAllowed: true,
        validateion: []
    },
    abb: {
        type: String,
        nullAllowed: true,
        validateion: []
    },
    name: {
        type: String,
        nullAllowed: true,
        validateion: []
    },
    alias: {
        type: String,
        nullAllowed: true,
        validateion: []
    },
    sgroup: {
        type: {},
        nullAllowed: true,
        validateion: []
    }     
};

module.exports = SubjectModel;