const http = require('http')
const url = require('url')
const fs = require('fs')
const lookup = require('mime-types').lookup

const server = http.createServer((req, res)=>{

    let parsedURL = url.parse(req.url, true)

    let path = parsedURL.path.replace(/^\/+|\/+$/g, "")

    if (path === ""){
        path = "index.html"
    }
    console.log(`req path ${path}`)

    let file = __dirname + "/public/" + path 

    fs.readFile(file, function(err, content){
        if (err) {
            console.log(`File Not Found ${file}`)
            res.writeHead(404)
            res.end()
        }   else{
            console.log(`Returning ${path}`)
            res.setHeader("X-Content-Type-Options", "nosniff")
            let mime = lookup(path);
            res.writeHead(200, {"Content-Type" : mime})
           
            res.end(content)
            }
    })
})

server.listen(1111, "localhost", ()=>{
    console.log("listening on 1111")
})


    


 // switch (path) {
            // case "about.html":
                // res.writeHead(200, {"Content-Type" : "text/html"})
                // break 
                // case "contact.html":
                    // res.writeHead(200, {"Content-Type" : "text/html"})
                    // break
                    // case "index.html":
                    // res.writeHead(200, {"Content-Type" : "text/html"})
                    // break
                // case "style.css":
                    // res.writeHead(200, {"Content-Type" : "text/css"})
                    // break
                // case "fu.jpg":
                    // res.writeHead(200, {"Content-Type" : "image/jpg"})
                    // break
                // case "joefull.png":
                    // res.writeHead(200, {"Content-Type" : "image/png"})
                    // break
            // }