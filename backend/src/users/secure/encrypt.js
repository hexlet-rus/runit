"use strict";
exports.__esModule = true;
exports.encrypt = void 0;
var bcrypt = require("bcrypt");
var encrypt = function (password) {
    return bcrypt.hashSync(password, 10);
};
exports.encrypt = encrypt;
