const mongoose = require('mongoose');
const {Schema} = mongoose;

const reservationSchema = new Schema(
    {
        departure: {type: String, required: true},
        arrival: {type: String, required: true},
        date: {type: String, required: true},
        time: {type: String, required: true},
        peoplenum: {type: String, required: true},
        age: {type: String, required: true},
        way: {type: String, required: true},
        card: {type: String, required: true},
        cardnum: {type: String, required: true},
        state: {type: String, required: true},
        seat: {type: Array, required: true},
        level: {type: String, required: true},
        disdegree: {type: String, required: true}
    },
    {
        collection: 'reservation',
        versionKey: false
    }
);

reservationSchema.statics.reserve = function(departure, arrival, date, time, peoplenum, age, way, card, cardnum, state, seat, level, disdegree) {
    var newReserve = new this({departure, arrival, date, time, peoplenum, age, way, card, cardnum, state, seat, level, disdegree});

    const result = newReserve.save()

    return result;
}

reservationSchema.statics.deleteReservation = function(id) {
    return this.remove({_id: id});
}

reservationSchema.statics.getReservation = function(id) {
    return this.findOne({ _id: id});
}

reservationSchema.statics.editReservation = function(id, departure, arrival, date, time, peoplenum, age, way, card, cardnum, state, seat, level, disdegree) {
    return this.update(
        {_id: id},
        {
            $set: {
                "departure": departure,
                "arrival": arrival,
                "date": date,
                "time": time,
                "peoplenum": peoplenum,
                "age": age,
                "way": way,
                "card": card,
                "cardnum": cardnum,
                "state": state,
                "disdegree" : disdegree,
                "seat": seat,
                "level": level
            }
        }
    )
}

module.exports = mongoose.model('reservation', reservationSchema);