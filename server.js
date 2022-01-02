const fs  = require('fs')
const http = require('http')
const url = require('url')

const server = http.createServer((req, res)=>{
    console.log(req.url, req.method)
    
    
    let path = './views'
    switch(req.url){
        case '/':
            path+= '/index.html'
            console.log(fs.statSync(path))
            break
        case '/about':
            path += '/about.html'
            console.log(fs.statSync(path))
            break
        case '/contact':
            path += '/contact'
            console.log(fs.statSync(path))
        default:
            path += '/404.html'
            break
    }
    fs.readFile(path, (err, data)=>{
        if (err) {
            console.log(err)
            res.end()
        }
        if(/.(image)$/.test(path)){
            res.writeHead(200, {'Content-Type': 'image/jpg'});
            res.end(data,'Base64');
            console.log('this a motha fukin image bro')
        }
         else {
            res.write(data)
            res.end()
        }
        console.log(req.url)
    }) 
    
})
server.listen(3000, ()=>{
    console.log('listening on 3000')
})
