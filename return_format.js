// Standardize response format
function response(status, message, result) {
    // status => Status Code
    // message => Message for debugging
    // result => Body
    return {
        status: status,
        message: message,
        result: result
    }
}

module.exports = response