const express = require('express');
const TrainRoute = require('../models/trainRoute');
const router = express.Router();

// input : 출발지, 도착지, 날짜, 시간
// input example
/*
{
    "departure" : "Daejeon",
    "arrival" : "Seoul",
    "date" : "2019-12-10",
    "time" : "09:00"
}
*/
// output : 해당하는 기차의 노선 정보
router.post('/search_path', (req, res) => {
    const departure=req.body.departure;
    const arrival=req.body.arrival;
    const date=req.body.date;
    const time=req.body.time;
    if(!departure)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "departure"});
    if(!arrival)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "arrival"});
    if(!date)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "date"});
    if(!time)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "time"});

    TrainRoute.searchPath(departure, arrival, date, time)
    .then(trainRoute => {
        if(!trainRoute) {
            // 없을 경우
            return res.status(404).send({code: '404', error: 2})
        }
        else {
            res.send(trainRoute);
        }
    })
    .catch(err => res.status(500).send({code: '500', error: 3}));
});

// input : 노선 정보
// input 예시
/*
{
    "trainInfo" : "73",
    "departure" : "Daejeon",
    "arrival" : "Seoul",
    "date" : "2019-12-10",
    "time" : "03:00",
    "laststop" : "Busan",
    "stopstation" : ["Gwangmyeong","Cheonan"],
    "deptime" : "09:00",
    "arrtime" : "12:00"
}
*/
// output : 노선 정보 데이터
router.post('/addRoute', (req, res) => {
    TrainRoute.addRoute(req.body)
    .then(trainRoute => res.send(trainRoute))
    .catch(err => res.status(500).send(err));
});

module.exports = router