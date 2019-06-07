const cheerio = require('cheerio')
const request = require('request')
var scheduler = require('node-schedule')
const res = require('./return_format')

// Interval
const schedule = process.env.SCHEDULE || '*/2 * * * *'

// Start time to execute scheduled job immediately
// Update value of delay if delayed scheduled job is desired
const delay = process.env.DELAY || 0
const startTime = new Date(Date.now() + delay);

// End time of scheduled job
// 20 min or 1200000 to stop at 10 outputs
const duration = process.env.DURATION || 1200000
const endTime = new Date(startTime.getTime() + duration);

// Scheduled job that executes getUserProfile
// Starts x minutes after scheduled job is executed
function executeCron(username) {
    scheduler.scheduleJob({ start: startTime, end: endTime, rule: schedule }, function(){
        getUserProfile(username)
    });
}

function getUserProfile(username) {
    // Initialize response format
    var resp = res(500, "An error has been encountered")
    
    // No parameter or cannot be read
    if(!username) {
        res(422, "No username detected")
    }

    request('http://www.twitter.com/' + username, function (error, response, body) {
        if(response.statusCode === 200) {
            const $ = cheerio.load(body)
        
            const username = $('a.ProfileHeaderCard-screennameLink span.username.u-dir b.u-linkComplex-target').text()
            const name = $('a.ProfileHeaderCard-nameLink').text()
            const profileImage = $('a.ProfileAvatar-container img.ProfileAvatar-image').attr('src')
            const followers = $('li.ProfileNav-item--followers a.ProfileNav-stat span.ProfileNav-value').attr('data-count')
            const following = $('li.ProfileNav-item--following a.ProfileNav-stat span.ProfileNav-value').attr('data-count')
    
            const profile = {
                username: username,
                name: name,
                profileImage: profileImage,
                followers: followers,
                following: following
            }
            resp = res(200, "Profile successfully retrieved", profile)
        } else {
            if(response.statusCode === 404) {
                resp = res(404, "User cannot be found")
            } else if(response.statusCode === 401) {
                resp = res(401, "Authorization error")
            } else if(response.statusCode === 500) {
                resp = res(500, "Server error")
            } else {
                resp = res(500, error.message)
            }
        }
        // Time log for monitoring
        console.log(new Date(Date.now() + delay))
        console.log(resp)
    });
} 

module.exports = executeCron