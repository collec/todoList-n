var express = require('express')
// var router = require('./router')
var fs = require('fs')
var bodyParser = require('body-parser')
var app = express()

app.use('/node_modules/', express.static('node_modules'))
app.use('/public/', express.static('public'))

// art-templete 模板引擎
app.engine('html', require('express-art-template'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var comments = [
  {
    "content": "吃饭",
    "status": "false"
  },
  {
    "content": "吃饭",
    "status": "false"
  }
]

app.get('/', function (req, res) {
  res.render('index.html')
})
app.post('./index', function(req, res){
  // res.render('index.html')
  var comment = req.body
  comments.unshift(comment)
  res.redirect('/')
  var s = req.body
  console.log(s)
})
app.listen(3000, function() {
  console.log('express success')
})
