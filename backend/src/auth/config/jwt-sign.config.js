"use strict";
exports.__esModule = true;
var constants_1 = require("../constants");
exports["default"] = (function () {
    switch (process.env.NODE_ENV) {
        case 'test':
            return {
                secret: constants_1.jwtConstants.secretTest,
                signOptions: { expiresIn: '10s' }
            };
        default:
            return {
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '60m' }
            };
    }
});
