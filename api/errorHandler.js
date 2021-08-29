module.exports = (err, req, res, next) => {
    console.log('Express Error: ', err)
    if (err.apiCode && err.apiCode >= 400) {
        err.apiError = err.apiError ? err.apiError : ''
        res.status(err.apiCode).json({
            apiCode: err.apiCode,
            apiError: err.apiError,
            ...err
        })
    } else {
        next()
    }
}