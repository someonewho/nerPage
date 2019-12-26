const mongoose = require('mongoose');
const {Schema} = mongoose;

const noticeSchema = new Schema(
    {
        title: {type: String, required: true, unique: true},
        content: {type: String, required: true},
    },
    {
        collection: 'notice',
        versionKey: false
    }
);

noticeSchema.statics.getNotice = function() {
    return this.find({});
}

noticeSchema.statics.getTitleList = function() {
    return this.find({},{"content":false});
}

noticeSchema.statics.getContents = function(id) {
    return this.findOne({ _id: id});
}

noticeSchema.statics.newContent = function(data) {
    var newContent = new this(data)
    return newContent.save();
}

module.exports = mongoose.model('notice', noticeSchema);
