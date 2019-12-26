const express = require('express');
const Notice = require('../models/notice');
const router = express.Router();

// input : X
// output : 공지사항의 제목과 해당 id
router.get('/get_title_list', (req, res) => {
    Notice.getTitleList()
    .then(notice => res.send(notice))
    .catch(err => res.status(500).send({code: '500', error: 3}));
})

// input : 공지사항 게시물의 id
// input example
/*
{
    "id" : "5de77baf44120913a2a722af",
}
*/
// output : 해당 공지사항 게시물의 내용
router.post('/get_content', (req, res) => {
    const id = req.body.id;
    if(!id)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "id"});
    Notice.getContents(id)
    .then((notice) => {
        if(!notice) {
            // 없을 경우
            return res.status(404).send({code: '404', error: 2})
        }
        else {
            res.send({title:notice.title, content: notice.content});
        }
    })
    .catch((err) => {
        res.status(500).send({code: '500', error: 3})
    })
})

// input : 추가할 공지사항 데이터
// input example
/*
{
    "title" : "titleTest",
    "content" : "testData"
}
*/
// output : 추가한 공지사항 데이터
router.post('/newContent', (req, res) => {
    Notice.newContent(req.body)
    .then(notice => res.send(notice))
    .catch(err => res.status(500).send({code: '500', error: 3}));
})

// input : X
// output : 모든 공지사항 데이터
router.get('/getNotice', (req, res) => {
    Notice.getNotice()
    .then(notice => res.send(notice))
    .catch(err => res.status(500).send({code: '500', error: 3}));
})


module.exports = router