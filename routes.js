var express = require('express')
var router = express.Router()
const routes = router

const user = require('./user')

// Home URL
routes.get('/', function(req, res) {
    res.send('Scraper API is up and working!')
})

// Part 1
routes.get('/user_profile/:username', function(req,res) {
    username = req.params.username
    user(username, (profile) => {
        res.json(profile)
    })
})

module.exports = router