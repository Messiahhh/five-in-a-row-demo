const express = require('express')
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-Parser')
    , logger = require('morgan')
    , http = require('http')
    , path = require('path')
    , qs = require('querystring')

let app = express()
let server = http.createServer(app)
let io = require('socket.io')(server)

//router路由
let index = require('./routes/index.js')
let reg = require('./routes/reg.js')
let login = require('./routes/login.js')
let chat = require('./routes/chat.js')
//配置
let port = 3000

io.on('connection', function (socket) {
    console.log('someone is up')
    socket.on('say', function (data) {
        console.log(`${data.usr} says ${data.msg}`)
        socket.broadcast.emit('say', data)
    })
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


app.use('/', index)
app.use('/reg', reg)
app.use('/login', login)
app.use('/chat', chat)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})
  
// error handler
app.use(function(err, req, res, next) {
// set locals, only providing error in development
res.locals.message = err.message
res.locals.error = req.app.get('env') === 'development' ? err : {}

// render the error page
res.status(err.status || 500)
res.render('error')
})







server.listen(port,'0.0.0.0', () => {
    console.log(`Eden is running at ${port} port`)
})

