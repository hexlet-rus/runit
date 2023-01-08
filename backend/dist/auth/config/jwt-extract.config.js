"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const constants_1 = require("../constants");
const cookie_extractor_1 = require("../extractor/cookie.extractor");
exports.default = () => {
    switch (process.env.NODE_ENV) {
        case 'test':
            return {
                jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: constants_1.jwtConstants.secretTest,
            };
        default:
            return {
                jwtFromRequest: cookie_extractor_1.cookieExtractor,
                ignoreExpiration: false,
                secretOrKey: constants_1.jwtConstants.secret,
            };
    }
};
//# sourceMappingURL=jwt-extract.config.js.map