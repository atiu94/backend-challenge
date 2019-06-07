const cheerio = require('cheerio')
const request = require('request')
const res = require('./return_format')

function getUserProfile(username, callback) {
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
                resp = res(500, error.message, error)
            }
        }
        console.log(resp)
        return callback(resp)
    });
} 

module.exports = getUserProfile