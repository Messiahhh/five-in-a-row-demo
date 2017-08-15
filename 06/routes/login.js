/*
 * @Author: Messiah 
 * @Date: 2017-08-15 19:51:24 
 * @Last Modified by: Messiah
 * @Last Modified time: 2017-08-16 02:36:21
 */

const express = require('express')
let router = express.Router()
let mysql = require('../services/connect_mysql')
let redis = require('../services/connect_redis')

//session_id
let session_id = 'session_id'
//超时时间,两个小时
let expires = 60 * 60 * 2

let dateNow = () => {
    return (new Date()).getTime();
}

//把数据存在redis里，并暴露出来，以放入set-cookie头部
let saveRedis = ({
    user_id,
    usr
}) => {
    let key = dateNow()
    redis.hset(key, 'id', key)
    redis.hset(key, 'user_id', user_id)
    redis.hset(key, 'usr', usr)
    redis.expire(key, expires)
    return {
        id: key,
        user_id,
        usr
    }
}

router.post('/', (req, res) => {
    let {usr, psd} = req.body
    mysql.query('SELECT * FROM user WHERE username = ? AND password = ?', [usr, psd], (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            if (data && data.length !== 0) {
                req.session = saveRedis({
                    user_id: data[0].user_id,
                    usr: data[0].username
                })
                
                res.cookie(session_id, req.session.id, {expires: new Date(Date.now() + expires * 1000)})
                res.cookie('usr', req.session.usr)
                res.json({
                    status: 200,
                    info: '登陆成功'
                })
            }

            else {
                res.json({
                    status: 400,
                    info: '用户不存在，或密码错误'
                })
            }
        }
    })
})

module.exports = router