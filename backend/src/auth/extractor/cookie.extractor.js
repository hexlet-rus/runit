"use strict";
exports.__esModule = true;
exports.cookieExtractor = void 0;
var cookieExtractor = function (req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies.access_token;
    }
    return token;
};
exports.cookieExtractor = cookieExtractor;
