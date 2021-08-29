function requireBody(req, res, next) {
    if (req.body && Object.keys(req.body).length > 0) {
        next()
    } else {
        next({ apiCode: 400, apiError: 'Body is Required!' })
    }
}

module.exports = requireBody