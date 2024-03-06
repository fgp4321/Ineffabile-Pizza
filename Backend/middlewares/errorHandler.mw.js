const logger = require("../logger")

function errorHandler(err,req,res,next){
    const { status = 500, message = "FALLO GENERAL "} = err
    logger.error.error(status + " " + message)
}

module.exports = errorHandler