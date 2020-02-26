var express = require("express")
var headers = require("headersfromextensions")
var compression = require('compression')
var fs = require("fs")
var jokes = require("./jokes")

var app = express()
var server = require('http').Server(app)
var io = require('socket.io').listen(server)

app.use(compression())

app.get("/", (req, res) => {
    res.render("index.ejs")
})
//FONTS
.get("/files/font/:fileName", (req, res) => {
    var fileName = req.params.fileName
    var filePath
    //TTF
    if(fileName.indexOf('.ttf') != -1) {
      filePath = "/res/fonts/" + fileName
      fs.readFile("." + filePath, (err, data) => {
        if(err) { /*File not found*/ }
        res.setHeader('Content-Type', headers.get("ttf"))
        res.send(data)
      })
    }
    //WOFF2
    else if(fileName.indexOf('.woff2') != -1) {
      filePath = "/res/fonts/" + fileName
      fs.readFile("." + filePath, (err, data) => {
        if(err) { /*File not found*/ }
        res.setHeader('Content-Type', headers.get("woff2"))
        res.send(data)
      })
    }
    //EOT
    else if(fileName.indexOf('.eot') != -1) {
      filePath = "/res/fonts/" + fileName
      fs.readFile("." + filePath, (err, data) => {
        if(err) { /*File not found*/ }
        res.setHeader('Content-Type', headers.get('eot'))
        res.send(data)
      })
    }
    //WOFF
    else if(fileName.indexOf('.woff') != -1) {
      filePath = "/res/fonts/" + fileName
      fs.readFile("." + filePath, (err, data) => {
        if(err) { /*File not found*/ }
        res.setHeader('Content-Type', headers.get("woff"))
        res.send(data)
      })
    }
    //SVG
    else if(fileName.indexOf('.svg') != -1) {
      filePath = "/res/fonts/" + fileName
      fs.readFile("." + filePath, (err, data) => {
        if(err) { /*File not found*/ }
        res.setHeader('Content-Type', headers.get('svg'))
        res.send(data)
      })
    }
})
//CSS
.get("/files/css/:fileName", (req, res) => {
    var fileName = req.params.fileName
    var filePath
    
    if(fileName.indexOf('.css') != -1) {
      filePath = "/res/styles/" + fileName
      fs.readFile("." + filePath, "utf-8", (err, data) => {
        if(err) { /*File not found*/ }
        res.setHeader('Content-Type', headers.get("css"))
        res.send(data)
      })
    }
})
//VIEWS JS
.get("/files/views_js/:fileName", (req, res) => {
    var fileName = req.params.fileName
    var filePath
    
    if(fileName.indexOf('.js') != -1) {
      filePath = "/res/views_js/" + fileName
      fs.readFile("." + filePath, "utf-8", (err, data) => {
        if(err) { /*File not found*/ }
        res.setHeader('Content-Type', headers.get("js"))
        res.send(data)
      })
    }
})
//IMGS
.get("/files/img/:fileName", (req, res) => {
    var fileName = req.params.fileName
    var filePath
    //PNG
    if (fileName.endsWith('.png')) {
      filePath = "/res/imgs/" + fileName
      fs.readFile("." + filePath, (err, data) => {
        if (err) { /*File not found*/ }
        res.setHeader('Content-Type', headers.get("png"))
        res.send(data)
      })
    }
    //JPG
    if (fileName.endsWith('.jpg')) {
      filePath = "/res/imgs/" + fileName
      fs.readFile("." + filePath, (err, data) => {
        if (err) { /*File not found*/ }
        res.setHeader('Content-Type', headers.get("jpg"))
        res.send(data)
      })
    }
    //SVG
    if (fileName.endsWith('.svg')) {
      filePath = "/res/imgs/" + fileName
      fs.readFile("." + filePath, (err, data) => {
        if (err) { /*File not found*/ }
        res.setHeader('Content-Type', headers.get("svg"))
        res.send(data)
      })
    }
}) 
//FAVICONS
.get("/files/favicon/:fileName", (req, res) => {
    var fileName = req.params.fileName
    var filePath
    //PNG
    if (fileName.endsWith('.png')) {
        filePath = "/res/favicons/" + fileName
        fs.readFile("." + filePath, (err, data) => {
            if (err) { /*File not found*/ }
            res.setHeader('Content-Type', headers.get('png'))
            res.send(data)
        })
    }
    //SVG
    if (fileName.endsWith('.svg')) {
        filePath = "/res/favicons/" + fileName
        fs.readFile("." + filePath, (err, data) => {
            if (err) { /*File not found*/ }
            res.setHeader('Content-Type', headers.get("svg"))
            res.send(data)
        })
    }
    //ICO
    if (fileName.endsWith('.ico')) {
        filePath = "/res/favicons/" + fileName
        fs.readFile("." + filePath, (err, data) => {
            if (err) { /*File not found*/ }
            res.setHeader('Content-Type', headers.get('ico'))
            res.send(data)
        })
    }
    //XML
    if (fileName.endsWith('.xml')) {
        filePath = "/res/favicons/" + fileName
        fs.readFile("." + filePath, (err, data) => {
            if (err) { /*File not found*/ }
            res.setHeader('Content-Type', headers.get("xml"))
            res.send(data)
        })
    }
    //MANIFEST
    if (fileName.endsWith('.webmanifest')) {
        filePath = "/res/favicons/" + fileName
        fs.readFile("." + filePath, (err, data) => {
            if (err) { /*File not found*/ }
            res.setHeader('Content-Type', headers.get("webmanifest"))
            res.send(data)
        })
    }
})
//NOT SPECIFIED
.use((req, res, next) => {
    res.sendStatus(404)
})

server.listen(80)

io.sockets.on('connection', (socket) => {
    socket.on('joke', (message) => {
        joke = jokes.jokes[Math.floor(Math.random() * jokes.jokes.length)]
        socket.emit('joke', joke)
    })
})