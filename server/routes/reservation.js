const express = require('express');
const Reservation = require('../models/reservation');
const router = express.Router();

// input: 아래 예시와 같은 형식의 데이터 
/*
{
    "departure": "daejeon",
    "arrival": "seoul",
    "date": "2019-12-11",
    "time": "09:00",
    "peoplenum": "1",
    "age": "children",
    "way": "oneway",
    "card": "Kakao_bank",
    "cardnum": "3333-33-3333",
    "state": "0",
    "seat":["6000_새마을호","1_a"],
    "level" : "1",
    "disdegree":"0"
}
*/
// output : _ID
// todo : 반환되는 reservation id를 유저 데이터에다가도 추가해줘야함
router.post('/reserve', (req, res) => {
    const departure = req.body.departure;
    const arrival = req.body.arrival;
    const date = req.body.date;
    const time = req.body.time;
    const peoplenum = req.body.peoplenum;
    const age = req.body.age;
    const way = req.body.way;
    const card = req.body.card;
    const cardnum = req.body.cardnum;
    const state = req.body.state;
    const seat = req.body.seat;
    const level = req.body.level;
    const disdegree = req.body.disdegree;
    // console.log(req.body)

    if(!departure)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "departure"});
    if(!arrival)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "arrival"});     
    if(!date)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "date"});
    if(!time)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "time"});   
    if(!peoplenum)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "peoplenum"});
    if(!age)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "age"});
    if(!way)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "way"});   
    if(!card)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "card"});
    if(!cardnum)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "cardnum"});
    if(!state)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "state"});
    if(!seat)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "seat"});
    if(!level)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "level"})
    if(!disdegree)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "disdegree"});

    Reservation.reserve(departure, arrival, date, time, peoplenum, age, way, card, cardnum, state, seat, level, disdegree)
        .then(reservation => res.send({_id : reservation._id}))
        .catch(err => res.status(500).send({code: '500', error: 3, state: false}));
})

// input : 해당 예매 정보에 대한 id
// output : 삭제된 예매 정보의 좌석 정보
router.post('/cancel', (req, res) => {
    const id = req.body.id;
    if(!id)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "id"});
    let deleteTarget;
    Reservation.getReservation(id)
        .then((reservation) => {
            if(!reservation) {
                // 없을 경우
                return res.status(404).send({code: '404', error: 2})
            }
            else {
                deleteTarget=reservation.seat;
            }
        })
        .catch((err) => {
            res.status(500).send({code: '500', error: 3})
        })
    console.log(deleteTarget)
    Reservation.deleteReservation(id)
    .then((reservation) => {
        if(!reservation) {
            // 없을 경우
            return res.status(404).send({code: '404', error: 2, state: false})
        }
        else {
            res.send(deleteTarget);
        }
    })
    .catch((err) => {
        res.status(500).send({code: '500', error: 3, state: false})
    })
})

// input : 해당 예매 정보에 대한 id
// output :  해당 예매 정보
router.post('/getReservation', (req, res) => {
    const id = req.body.id;
    if(!id)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "id"});
    Reservation.getReservation(id)
    .then((reservation) => {
        if(!reservation) {
            // 없을 경우
            return res.status(404).send({code: '404', error: 2})
        }
        else {
            res.send(reservation);
        }
    })
    .catch((err) => {
        res.status(500).send({code: '500', error: 3})
    })
})

// input: 아래 예시와 같은 형식의 데이터 
/*
{
    "departure": "daejeon",
    "arrival": "seoul",
    "date": "2019-12-11",
    "time": "09:00",
    "peoplenum": "1",
    "age": "children",
    "way": "oneway",
    "card": "Kakao_bank",
    "cardnum": "3333-33-3333",
    "state": "0"
    "seat":["6000_새마을호","1_a"]
    "level" : "1"
    "disdegree":"0"
}
*/
// output : state
router.post('/edit', (req, res) => {
    const departure = req.body.departure;
    const arrival = req.body.arrival;
    const date = req.body.date;
    const time = req.body.time;
    const peoplenum = req.body.peoplenum;
    const age = req.body.age;
    const way = req.body.way;
    const card = req.body.card;
    const cardnum = req.body.cardnum;
    const state = req.body.state;
    const seat = req.body.seat;
    const level = req.body.level;
    const disdegree = req.body.disdegree;

    if(!departure)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "departure"});
    if(!arrival)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "arrival"});     
    if(!date)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "date"});
    if(!time)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "time"});   
    if(!peoplenum)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "peoplenum"});
    if(!age)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "age"});
    if(!way)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "way"});   
    if(!card)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "card"});
    if(!cardnum)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "cardnum"});
    if(!state)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "state"});
    if(!seat)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "seat"});
    if(!level)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "level"});
    if(!disdegree)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "disdegree"});

    Reservation.editReservation(departure, arrival, date, time, peoplenum, age, way, card, cardnum, state, seat, level, disdegree)
    .then(res.send({state: true}))
    .catch(err => res.status(500).send({code: '500', error: 3, state: false}));
})

module.exports = router