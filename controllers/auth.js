module.exports.login = function(req, res) {
    res.status(200).json({
        login: 'from controller'
    });
}

module.exports.registr = function(req, res) {
    res.status(200).json({
        registr: 'from controller'
    });
}