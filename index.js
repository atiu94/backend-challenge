var express = require('express')
var port = process.env.PORT || 3000
var routes = require('./routes')
var app = express()
var resp = require('./return_format')

// Timeout handling (set at 30s by default)
const timeout = 30000 || process.env.TIMEOUT
app.use( (req, res, next)=> {
    setTimeout( ()=> {
      if(!res.headersSent) {
        const response = resp(503, 'Your request timed out.')
        res.status(503).json(response)
      }
    }, timeout)
    next()
})

app.use('/', routes);

// Non-existent routes
app.use((req, res, next) => {
    const error = resp(404, "Route not found.")
    res.status(404).json(error)
});

var server = app.listen(port, function () {
    console.log("Listening on port %s", port)
});


