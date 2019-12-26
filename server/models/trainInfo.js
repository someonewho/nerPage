const mongoose = require('mongoose');
const {Schema} = mongoose;

const trainInfoSchema = new Schema(
    {
        trainName: {type: String, required: true},
        reserved: {type: Array, required: true},
        seats: {type: Array, required: true},
    },
    {
        collection: 'trainInfo',
        versionKey: false
    }
);

trainInfoSchema.statics.getTrainInfo = function(name) {
    return this.findOne({trainName: name});
}

trainInfoSchema.statics.addTrainInfo = function(data) {
    var newInfo = new this(data)
    return newInfo.save();
}

trainInfoSchema.statics.reservate=function(name, index){
    console.log(name)
    console.log(index)
    return this.update({trainName: name, "reserved.id":index}, { $set: { "reserved.$.state": "o" } });
}

trainInfoSchema.statics.reservateCancel=function(name, index){
    return this.update({trainName: name, "reserved.id":index}, { $set: { "reserved.$.state": "x" } });
}

module.exports = mongoose.model('trainInfo', trainInfoSchema);
