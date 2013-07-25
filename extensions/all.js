exports.preRequest = function (options, cfg) {

    var accessToken = cfg.oauth["access_token"];

    var credentials = accessToken + ":fubar";

    var auth = 'Basic ' + new Buffer(credentials).toString('base64');

    options.headers['Authorization'] = auth;
};