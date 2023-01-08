"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = void 0;
const bcrypt = require("bcrypt");
const encrypt = (password) => {
    return bcrypt.hashSync(password, 10);
};
exports.encrypt = encrypt;
//# sourceMappingURL=encrypt.js.map