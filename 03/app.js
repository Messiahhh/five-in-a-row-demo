let express = require('express')
let app = express()

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.sendFile('./index.html')
})


app.listen(3000)
