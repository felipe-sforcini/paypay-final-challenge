function displayError(error, res) {
    return res.status(500).json({
        mensagem: error.message
    });
}

function runResponse(statusCode, message, res) {
    return res.status(statusCode).json({
        mensagem: message
    });
}

module.exports = {
    displayError,
    runResponse
}