const http = require('http')
const path = require('path')
const fs = require('fs')


const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'static')))
app.use(express.static(path.join(__dirname, 'lib')))

app.get('/', (req, res) => {
    fs.readFile('./static/test.html', (err, data) => {
        res.writeHead(200, {
            'Content-Type': 'text/html',
        })
        res.end(data)
    })
})

app.post('/upload', (req, res) => {
    console.log(req.body)
    res.json({
        status: 200
    })
})



app.listen(3000, () => {
    console.log('Listening at 3000 port')
})
