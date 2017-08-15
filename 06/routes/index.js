const express = require('express')
let router = express.Router()
let redis = require('../services/connect_redis')

router.get('/', (req, res) => {
    let session_id = req.cookies.session_id
    console.log('ok')
    if (session_id) {
        redis.hgetall(session_id, (err, data) => {
            if (err) {
                console.log(err)
            }
            else {
                if (data && data.length !== 0) {
                    res.redirect('/chat')
                }
                else {
                    res.render('index.ejs')
                }
            }
        })
    }

    else {
        res.render('index.ejs')
    }
})

module.exports = router