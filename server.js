var express = require('express')
var path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
var serveStatic = require('serve-static')

var app = express()
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use(bodyParser.json());
app.use(cors())
app.use(serveStatic(path.join(__dirname, 'dist')))
var port = process.env.PORT || 5000

app.listen(port)
console.log('server started on port ' + port)
