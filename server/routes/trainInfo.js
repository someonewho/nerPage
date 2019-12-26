const express = require('express');
const TrainInfo = require('../models/trainInfo');
const router = express.Router();

// input : 기차 번호
// input example : 
/*
{
    "trainName":"73"
}
*/
// output : 해당 기차의 좌석 정보
router.post('/get_seat', (req, res) => {
	const trainName = req.body.trainName;
    if(!trainName)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "trainName"});
	TrainInfo.getTrainInfo(trainName)
	.then((trainInfo) => {
        if(!trainInfo) {
            // 없을 경우
            return res.status(404).send({code: '404', error: 2})
        }
        else {
            res.send({seats:trainInfo.seats});
        }
    })
    .catch((err) => {
        res.status(500).send({code: '500', error: 3})
    })
});

// input : 기차 번호
// input example : 
/*
{
    "trainName":"73"
}
*/
// output : 해당 기차의 예매된 좌석 정보
router.post('/get_reserved', (req, res) => {
	const trainName = req.body.trainName;
    if(!trainName)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "trainName"});
	TrainInfo.getTrainInfo(trainName)
	.then((trainInfo) => {
        if(!trainInfo) {
            // 없을 경우
            return res.status(404).send({code: '404', error: 2})
        }
        else {
            res.send({reserved:trainInfo.reserved});
        }
    })
    .catch((err) => {
        res.status(500).send({code: '500', error: 3})
    })
});

// input : 기차 번호
// input example : 
/*
{
	"trainName": "73",
	"reserved": [{"id":"1_a", "state":"x"},
	{"id":"1_b", "state":"x"},
	{"id":"1_c", "state":"x"},
	{"id":"1_d", "state":"x"},
	{"id":"1_e", "state":"x"},
	{"id":"1_f", "state":"x"},
	{"id":"1_g", "state":"x"},
	{"id":"1_h", "state":"x"},
	{"id":"1_i", "state":"x"},
	{"id":"1_j", "state":"x"},
	{"id":"2_a", "state":"x"},
	{"id":"2_b", "state":"x"},
	{"id":"2_c", "state":"x"},
	{"id":"2_d", "state":"x"},
	{"id":"2_e", "state":"x"},
	{"id":"2_f", "state":"x"},
	{"id":"2_g", "state":"x"},
	{"id":"2_h", "state":"x"},
	{"id":"2_i", "state":"x"},
	{"id":"2_j", "state":"x"},
	{"id":"3_a", "state":"x"},
	{"id":"3_b", "state":"x"},
	{"id":"3_c", "state":"x"},
	{"id":"3_d", "state":"x"},
	{"id":"3_e", "state":"x"},
	{"id":"3_f", "state":"x"},
	{"id":"3_g", "state":"x"},
	{"id":"3_h", "state":"x"},
	{"id":"3_i", "state":"x"},
	{"id":"3_j", "state":"x"}],
	"seats": ["ktx_1_a","ktx_1_b","ktx_1_c","ktx_1_d","ktx_1_e","ktx_1_f","ktx_1_g","ktx_1_h","ktx_1_i","ktx_1_j","ktx_2_a","ktx_2_b","ktx_2_c","ktx_2_d","ktx_2_e","ktx_2_f","ktx_2_g","ktx_2_h","ktx_2_i","ktx_2_j","ktx_3_a","ktx_3_b","ktx_3_c","ktx_3_d","ktx_3_e","ktx_3_f","ktx_3_g","ktx_3_h","ktx_3_i","ktx_3_j"]
}
*/
// output : 추가된 기차 정보
router.post('/addTrainInfo', (req, res) => {
    TrainInfo.addTrainInfo(req.body)
    .then(trainInfo => res.send(trainInfo))
    .catch(err => res.status(500).send(err));
});

// input : 기차 번호, 예약할 좌석 정보
// input example : 
/*
{
    "trainName":"73",
	"trainIndex":"1_a"
}
*/
// output : 기차 정보
router.post('/reservate', (req, res) => {
	const trainName = req.body.trainName;
	const trainIndex = req.body.trainIndex;
    if(!trainName)
		return res.status(404).send({code: '404', error: 1, shouldAttribute: "trainName"});
	if(!trainIndex)
		return res.status(404).send({code: '404', error: 1, shouldAttribute: "trainIndex"});

	console.log(req.body)

	TrainInfo.reservate(trainName,trainIndex)
	.then((trainInfo) => {
        if(!trainInfo) {
            // 없을 경우
            return res.status(404).send({code: '404', error: 2, state:false})
        }
        else {
            res.send({state:true});
        }
    })
    .catch((err) => {
        res.status(500).send({code: '500', error: 3, state:false})
    })
});

// input : 기차 번호, 예약된 좌석 정보
// input example : 
/*
{
    "trainName":"73",
	"trainIndex":"1_a"
}
*/
// output : 기차 정보
router.post('/reservateCancel', (req, res) => {
	const trainName = req.body.trainName;
	const trainIndex = req.body.trainIndex;
    if(!trainName)
		return res.status(404).send({code: '404', error: 1, shouldAttribute: "trainName"});
	if(!trainIndex)
		return res.status(404).send({code: '404', error: 1, shouldAttribute: "trainIndex"});
		
	TrainInfo.reservateCancel(trainName,trainIndex)
	.then((trainInfo) => {
        if(!trainInfo) {
            // 없을 경우
            return res.status(404).send({code: '404', error: 2, state:false})
        }
        else {
            res.send({state:true});
        }
    })
    .catch((err) => {
        res.status(500).send({code: '500', error: 3, state:false})
    })
});

module.exports = router;