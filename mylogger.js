exports.logger = function(req, res, next) {
    console.log('[LOG] ' + req.method + ' ' + req.path + ' - ' + req.ip);
    next();
}
