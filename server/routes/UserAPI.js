const express = require('express');

/* DB models */
const User = require('../models/User');

const router = express.Router();


/* Implements API Methods */
router.get('/', (req, res) => res.json({data:'this is User API.'}));

// 안 되겠다.. DAO 클래스를 UserAPI.js에서 정의하는걸로 하자.
router.post('/login', (req, res) => {
    // Error Code
    // 1 : front-end에서 account를 보내지 않았을때
    // 2 : 아이디가 없거나 비밀번호가 틀렸을때
    // 3 : 500 에러 => Back-End나 DB 문제

    const account = req.body.account
    const password = req.body.password

    if(!account) {
        // Code 1: Front-End에서 정확한 Format으로 보내지 않았을 때 : Id를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "account"})
    }
    if(!password) {
        // Code 1: Front-End에서 정확한 Format으로 보내지 않았을 때 : Password를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "password"})
    }

    User.login(account)
        .then((user) => {
            if(!user) {
                // Code 2 : User Id가 틀린 경우
                return res.status(404).send({code: '404', error: 2})
            }
            else {
                if(user.password !== password) {
                    // Code 2: User Password가 틀렸을 경우
                    return res.status(404).send({code: '404', error: 2})
                }
                else {
                    // Success!
                    return res.send({
                        account: user.account,
                        accountname: user.accountname,
                        phonenum: user.phonenum,
                        cardcompany: user.cardcompany,
                        cardnum: user.cardnum,
                        token: 'Login-OK'
                    })
                }
                // console.log(user)
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send({code: '500', error: 3})
        }) // Code 3 : BackEnd 나 DB 문제인 경우
        // 500 에러인 경우, FrontEnd에서는 무조건 서버 문제라고 띄어주면 됨.
})

router.post('/register', (req, res) => {
    // Error Code
    // 1 : front-end에서 account를 보내지 않았을때
    // 2 : 이미 중복되는 아이디가 있는 경우
    // 3 : 500 에러 => Back-End나 DB 문제

    console.log(req.body)

    const account = req.body.account
    const accountname = req.body.accountname
    const phonenum = req.body.phonenum
    const password = req.body.password
    const cardcompany = req.body.cardcompany
    const cardnum = req.body.cardnum

    if(!account) {
        // Code 1: Front-End에서 정확한 Format으로 보내지 않았을 때 : Id를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "account"})
    }
    if(!accountname) {
        // Code 1: Front-End에서 정확한 Format으로 보내지 않았을 때 : Account Name를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "accountname"})
    }
    if(!phonenum) {
        // Code 1 : Front-End에서 정확한 Format으로 보내지 않았을 때 : Phone Number를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "phonenum"})
    }
    if(!password) {
        // Code 1: Front-End에서 정확한 Format으로 보내지 않았을 때 : Password를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "password"})
    }
    if(!cardcompany) {
        // Code 1: Front-End에서 정확한 Format으로 보내지 않았을 때 : Card Company를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "cardcompany"})
    }
    if(!cardnum) {
        // Code 1: Front-End에서 정확한 Format으로 보내지 않았을 때 : Card Number를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "cardnum"})
    }

    // 우선 기존에 중복되는 아이디가 있는지 확인
    User.login(account)
        .then((user) => {
            if(user) {
                // Code 2 : 이미 중복되는 아이디가 있는 경우
                return res.status(404).send({code: '404', error: 2})
            }
            else {
                // 중복되는 아이디가 없으면 회원가입 해준다.
                User.register(account, accountname, phonenum, password, cardcompany, cardnum)
                    .then((register_result) => {
                        if(register_result) {
                            return res.send({
                                account: account,
                                accountname: accountname,
                                phonenum: phonenum,
                                cardcompany: cardcompany,
                                cardnum: cardnum,
                                token: 'Login-OK'
                            }) // 일단은 이렇게 성공했다고 보내는데 어찌할지는 front-end랑 맞춰봐야함.
                        }
                        else {
                            // Code 3 : BackEnd 나 DB 문제인 경우
                            return res.status(500).send({code: '500', error: 3})
                        }
                        // console.log(register_result)
                    })
                    .catch(err => {
                        console.log(err)
                        return res.status(500).send({code: '500', error: 3})
                    }) // Code 3 : BackEnd 나 DB 문제인 경우
            }
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send({code: '500', error: 3})
        }) // Code 3 : BackEnd 나 DB 문제인 경우
})

router.post('/modify', (req, res) => {
    // Error Code
    // 1 : front-end에서 account를 보내지 않았을때
    // 2 : 해당하는 아이디가 없는 경우
    // 3 : 500 에러 => Back-End나 DB 문제

    const account = req.body.account
    const accountname = req.body.accountname
    const phonenum = req.body.phonenum
    const password = req.body.password
    const cardcompany = req.body.cardcompany
    const cardnum = req.body.cardnum

    if(!account) {
        // Code 1: Front-End에서 정확한 Format으로 보내지 않았을 때 : Id를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "account"})
    }
    if(!accountname) {
        // Code 1: Front-End에서 정확한 Format으로 보내지 않았을 때 : Account Name를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "accountname"})
    }
    if(!phonenum) {
        // Code 1 : Front-End에서 정확한 Format으로 보내지 않았을 때 : Phone Number를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "phonenum"})
    }
    if(!password) {
        // Code 1: Front-End에서 정확한 Format으로 보내지 않았을 때 : Password를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "password"})
    }
    if(!cardcompany) {
        // Code 1: Front-End에서 정확한 Format으로 보내지 않았을 때 : Card Company를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "cardcompany"})
    }
    if(!cardnum) {
        // Code 1: Front-End에서 정확한 Format으로 보내지 않았을 때 : Card Number를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "cardnum"})
    }

    User.login(account)
        .then((user) => {
            if(!user) {
                // Code 2 : 해당하는 아이디가 없는 경우
                return res.status(404).send({code: '404', error: 2, notExact : "user"})
            }
            else {
                if(user.password === password) {
                    User.modify(account, accountname, phonenum, password, cardcompany, cardnum)
                    .then((register_result) => {
                        console.log(register_result)
                        if(register_result) {
                            return res.send({
                                state: true
                            })
                        }
                        else {
                            // Code 3 : BackEnd 나 DB 문제인 경우
                            return res.status(500).send({code: '500', error: 3})
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).send({code: '500', error: 3})
                    }) // Code 3 : BackEnd 나 DB 문제인 경우
                }
                else {
                    res.status(404).send({code : "404", error : 2, notExact : "password"})
                }
            }
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send({code: '500', error: 3})
        }) // Code 3 : BackEnd 나 DB 문제인 경우
})

router.post('/bookmarks', (req, res) => {
    // Error Code
    // 1 : front-end에서 account를 보내지 않았을때
    // 2 : 해당하는 회원이 없을 경우
    // 3 : 500 에러 => Back-End나 DB 문제

    const account = req.body.account

    if(!account) {
        // Code 1: Front-End에서 정확한 Format으로 보내지 않았을 때 : Id를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "account"})
    }

    User.returnBookmarks(account)
        .then((result) => {
            if(result.error) {
                const error = result.error
                if(error == "2") {
                    // Code 2 : 해당하는 회원이 없을 경우
                    return res.status(404).send({code: '404', error: error})
                }
                else {
                    // Code 3 : BackEnd 나 DB 문제인 경우
                    return res.status(500).send({code: '500', error: error})
                }
            }
            else {
                // Success!
                return res.send({
                    bookmarks: result.bookmarks
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({code: '500', error: 3})
        }) // Code 3 : BackEnd 나 DB 문제인 경우
})

router.post('/list/reservation', (req, res) => {
    // Error Code
    // 1 : front-end에서 account를 보내지 않았을때
    // 2 : 해당하는 ID가 없을 경우
    // 3 : 500 에러 => Back-End나 DB 문제

    const account = req.body.account

    if(!account) {
        // Code 1: Front-End에서 정확한 Format으로 보내지 않았을 때 : Id를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "account"})
    }

    User.login(account)
        .then(user => {
            if(!user) {
                // Code 2 : 해당하는 ID가 없을 경우
                return res.status(404).send({code: '404', error: 2})
            }
            else {
                // Success!
                return res.send({
                    reservation: user.reservation
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({code: '500', error: 3})
        }) // Code 3 : BackEnd 나 DB 문제인 경우
})

// input : 예약목록에 추가할 계정 명, 추가할 reservation ID
// output : success state or error msg
router.post('/reserve', (req, res) => {
    // Error Code
    // 1 : front-end에서 account를 보내지 않았을때
    // 2 : 해당하는 아이디가 없는 경우
    // 3 : 500 에러 => Back-End나 DB 문제

    const account = req.body.account
    const resvID = req.body.resvID

    if(!account)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "account"})
    if(!resvID)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "resvID"})

    User.login(account)
        .then((user) => {
            if(!user) {
                return res.status(404).send({code: '404', error: 2})
            }
            else {
                var reserveList=user.reservation;
                reserveList.push(resvID);
                User.updateResvList(account, reserveList)
                    .then((register_result) => {
                        if(register_result) {
                            return res.send({
                                state: true
                            })
                        }
                        else {
                            // Code 3 : BackEnd 나 DB 문제인 경우
                            return res.status(500).send({code: '500', error: 3})
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).send({code: '500', error: 3})
                    }) // Code 3 : BackEnd 나 DB 문제인 경우
            }
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send({code: '500', error: 3})
        }) // Code 3 : BackEnd 나 DB 문제인 경우
})

// input : 삭제를 진행할 계정 명, 삭제할 reservation ID
// output : success state or error msg
router.post('/reserve_cancel', (req, res) => {
    // Error Code
    // 1 : front-end에서 account를 보내지 않았을때
    // 2 : 해당하는 아이디가 없는 경우
    // 3 : 500 에러 => Back-End나 DB 문제

    const account = req.body.account
    const resvID = req.body.resvID

    if(!account)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "account"})
    if(!resvID)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "resvID"})

    User.login(account)
        .then((user) => {
            if(!user) {
                return res.status(404).send({code: '404', error: 2})
            }
            else {
                var reserveList=user.reservation;
                let deleteTarget=-1; // 발견되지 않았을 때 -1
                for(let i=0; i<reserveList.length; i++){
                    if(reserveList[i]===resvID){
                        deleteTarget=i;
                        break;
                    }
                }

                if(deleteTarget==-1)
                    return res.status(404).send({code: '404', error: 2});
                
                reserveList.splice(deleteTarget, 1);

                User.updateResvList(account, reserveList)
                    .then((register_result) => {
                        if(register_result) {
                            return res.send({
                                state: true
                            })
                        }
                        else {
                            // Code 3 : BackEnd 나 DB 문제인 경우
                            return res.status(500).send({code: '500', error: 3})
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).send({code: '500', error: 3})
                    }) // Code 3 : BackEnd 나 DB 문제인 경우
            }
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send({code: '500', error: 3})
        }) // Code 3 : BackEnd 나 DB 문제인 경우
})

// input : 즐겨찾기에 추가할 계정 명, 추가할 bookmark
// output : success state or error msg
router.post('/add/bookmark', (req, res) => {
    // Error Code
    // 1 : front-end에서 account를 보내지 않았을때
    // 2 : 해당하는 아이디가 없는 경우
    // 3 : 500 에러 => Back-End나 DB 문제

    const account = req.body.account
    const bookmark = req.body.bookmark

    console.log(account)
    console.log(bookmark)

    if(!account)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "account"})
    if(!bookmark)
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "bookmark"})

    User.login(account)
        .then((user) => {
            if(!user) {
                return res.status(404).send({code: '404', error: 2})
            }
            else {
                var bookmarkList=user.bookmarks;
                bookmarkList.push(bookmark);
                User.addBookmarks(account, bookmarkList)
                    .then((register_result) => {
                        if(register_result) {
                            return res.send({
                                state: true
                            })
                        }
                        else {
                            // Code 3 : BackEnd 나 DB 문제인 경우
                            return res.status(500).send({code: '500', error: 3})
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).send({code: '500', error: 3})
                    }) // Code 3 : BackEnd 나 DB 문제인 경우
            }
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send({code: '500', error: 3})
        }) // Code 3 : BackEnd 나 DB 문제인 경우
})

module.exports = router
