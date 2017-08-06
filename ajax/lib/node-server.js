const qs = require('querystring'),
      url = require('url'),
      mime = require('mime'),
      ejs = require('ejs'),
      fs = require('fs')


const pack = (req, res) => {

    req.method = req.method.toLowerCase()

    req.query = qs.parse(url.parse(req.url).query)

    req.cookies = qs.parse(req.headers.cookie, ';')



    res.json = (json) => {
        res.writeHead(200, {
            'Content-Type': 'application/json',
        })
        res.end(JSON.stringify(json))
    }

    res.redirect = (url) => {
        res.writeHead(302, {
            'Location': url,
        })
        res.end(`Location to ${url}`);
    }


    res.render = (file, obj) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            let html = data
            if (mime.lookup(file) !== 'text/html') {
                html = ejs.render(data, obj)
            }
            res.writeHead(200, {
                'Content-type': 'text/html',
            })
            res.write(html)
            res.end()
        })
    }
}


const getBody = (req) => {
    return new Promise((resolve, reject) => {
        let obj = {},
            segment = []
        req.on('data', (chunk) => {
            segment.push(chunk)
        })
        req.on('end', () => {
            segment = Buffer.concat(segment).toString()
            req.body = !segment ? obj : qs.parse(segment)
            resolve(segment);
        })
    })
}

// exports.getBody = getBody
module.exports = {
    fs,
    url,    
    qs,
    pack,
    getBody,
}