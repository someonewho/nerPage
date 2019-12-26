const express = require('express');
const QnA = require('../models/qna');
const router = express.Router();

// input : X
// output : qna의 제목과 해당 id
router.get('/get_title_list', (req, res) => {
    QnA.getTitleList()
    .then(qna => res.send(qna))
    .catch(err => res.status(500).send({code: '500', error: 3}));
})

// input : qna게시물의 id
// input example
/*
{
    "id" : "5de77baf44120913a2a722af",
}
*/
// output : 해당 qna게시물의 제목, 내용
router.post('/get_content', (req, res) => {
    const id = req.body.id;
    if(!id)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "id"});
    QnA.getContents(id)
    .then((qna) => {
        if(!qna) {
            // 없을 경우
            return res.status(404).send({code: '404', error: 2})
        }
        else {
            res.send({title:qna.title, content: qna.content});
        }
    })
    .catch((err) => {
        res.status(500).send({code: '500', error: 3})
    })
})

// input : X
// output : 모든 QnA 데이터
router.get('/getQnA', (req, res) => {
    QnA.getQnA()
    .then(qna => res.send(qna))
    .catch(err => res.status(500).send({code: '500', error: 3}));
})

// input : 추가할 qna 데이터
// input example
/*
{
    "title" : "titleTest",
    "content" : "testData"
}
*/
// output : 추가한 qna 데이터
router.post('/newContent', (req, res) => {
    QnA.newContent(req.body)
    .then(qna => res.send(qna))
    .catch(err => res.status(500).send({code: '500', error: 3}));
})

module.exports = router