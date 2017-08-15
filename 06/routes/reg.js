/*
 * @Author: Messiah 
 * @Date: 2017-08-15 19:53:23 
 * @Last Modified by:   Messiah 
 * @Last Modified time: 2017-08-15 19:53:23 
 */
const express = require('express')
let router = express.Router()
let mysql = require('../services/connect_mysql')

router.post('/', (req, res) => {
    let {usr, psd} = req.body
    mysql.query('SELECT * FROM user WHERE username = ?', [usr], (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            if (data && data.length !== 0) {
                res.json({
                    status: 400,
                    info: '用户已经存在'
                })
            }
            else {
                mysql.query('INSERT INTO user VALUE(?, ?, ?)', [null, usr, psd], (err) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        res.json({
                            status: 200,
                            info: '注册成功'
                        })
                    }
                })
            }
        }
    })
})

module.exports = router