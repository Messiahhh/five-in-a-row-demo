let http = require('http');
let fs = require('fs');
let url = require('url');
let path = require('path');

let conn = require('./services/contect_mysql'); 

http.createServer((req, res) => {
    // console.log(req.url);
    if (req.url === '/') {
        fs.readFile('index.html', (err, data) => {
            res.writeHead(200, {"Content-Type": 'text/html'});
            res.end(data);
        })
    }
    
    

    else if (req.url === '/upload') {
        let segment = [];
        req.on('data', (chunk) => {
            segment.push(chunk);
        });

        req.on('end', () => {
            let b = Buffer.concat(segment);
            let pngName = Math.round(Math.random() * 100000000) + '.png';
            let pathName = 'public/image/' +  pngName;
            fs.writeFile(pathName, b, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(pathName)
                    conn.query('INSERT INTO image VALUE (?)',[pathName], (err,data) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                    console.log('ok');
                }
            });
            res.writeHead(200);
            res.end();
        });
    }
    

    else {
        let root = path.resolve(process.argv[2] || '.');
        // 获得URL的path，类似 '/css/bootstrap.css':
        let pathname = url.parse(req.url).pathname;
        // // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
        let filepath = path.join(root, pathname);
        // // 获取文件状态:
        fs.stat(filepath, (err, stats) => {
            if (!err && stats.isFile()) {
                // 没有出错并且文件存在:
                console.log('200 ' + req.url);
                // 发送200响应:
                res.writeHead(200);
                // 将文件流导向response:
                fs.createReadStream(filepath).pipe(res);
            } else {
                // 出错了或者文件不存在:
                console.log('404 ' + req.url);
                // 发送404响应:
                res.writeHead(404);
                res.end('404 Not Found');
            }
        });
    }

    
}).listen(3000, '127.0.0.1', () => {
    console.log('success');
});
