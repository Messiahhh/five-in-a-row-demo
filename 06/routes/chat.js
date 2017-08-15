const express = require('express')

let router = express.Router()
let redis = require('../services/connect_redis')

router.get('/', (req, res) => {
    let session_id = req.cookies.session_id
    if (!session_id) {
        res.redirect('/')
    }
    else {
        redis.hgetall(session_id, (err, data) => {
            if (err) {
                console.log(err)
            }

            else {
                if (data && data.length !== 0) {
                    console.log(data)
                    res.render('chat.ejs',  {username: data.usr})
                }

                else {
                    res.redirect('/')
                }
            }
        })
    }
})

module.exports = router