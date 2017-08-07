const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'static')))

app.get('/', (req, res) => {
    res.sendfile('index.html')
})

app.listen('3000', () => {
    console.log('listening at 3000 port')
})