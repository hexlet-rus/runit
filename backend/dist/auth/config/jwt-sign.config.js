"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
exports.default = () => {
    switch (process.env.NODE_ENV) {
        case 'test':
            return {
                secret: constants_1.jwtConstants.secretTest,
                signOptions: { expiresIn: '10s' },
            };
        default:
            return {
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '60m' },
            };
    }
};
//# sourceMappingURL=jwt-sign.config.js.map