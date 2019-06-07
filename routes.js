var express = require('express')
var router = express.Router()
const routes = router

// Home URL
routes.get('/', function(req, res) {
    res.send('Scraper API is up and working!')
})

module.exports = router