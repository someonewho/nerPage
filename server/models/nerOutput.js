const mongoose = require('mongoose');
const {Schema} = mongoose;

const outputSchema = new Schema(
    {
        input: {type: String, required: true},
        word: {type: String, required: true, unique: true},
        decoding: {type: String, required: true},
    },
    {
        collection: 'ner',
        versionKey: false
    }
);

outputSchema.statics.getOutput = function(input) {
    return this.find({input: input});
}

outputSchema.statics.getTitleList = function() {
    return this.find({},{"content":false});
}

outputSchema.statics.getContents = function(id) {
    return this.findOne({ _id: id});
}

outputSchema.statics.newContent = function(data) {
    var newContent = new this(data)
    return newContent.save();
}

module.exports = mongoose.model('ner', outputSchema);
