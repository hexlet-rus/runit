"use strict";
exports.__esModule = true;
var passport_jwt_1 = require("passport-jwt");
var constants_1 = require("../constants");
var cookie_extractor_1 = require("../extractor/cookie.extractor");
exports["default"] = (function () {
    switch (process.env.NODE_ENV) {
        case 'test':
            return {
                jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: constants_1.jwtConstants.secretTest
            };
        default:
            return {
                jwtFromRequest: cookie_extractor_1.cookieExtractor,
                ignoreExpiration: false,
                secretOrKey: constants_1.jwtConstants.secret
            };
    }
});
