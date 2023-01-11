"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateUserDto = void 0;
var class_validator_1 = require("class-validator");
var check_email_1 = require("../validation/check-email");
var check_login_1 = require("../validation/check-login");
var check_password_1 = require("../validation/check-password");
var compare_passwords_1 = require("../validation/compare-passwords");
var UpdateUserDto = /** @class */ (function () {
    function UpdateUserDto() {
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.Length)(3, 20),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.Matches)(/[A-Za-z]/),
        (0, class_validator_1.Validate)(check_login_1.CheckLogin, {
            message: 'Уже существует!'
        })
    ], UpdateUserDto.prototype, "login");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsEmail)(),
        (0, class_validator_1.Validate)(check_email_1.CheckEmail, {
            message: 'Уже существует!'
        })
    ], UpdateUserDto.prototype, "email");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.Validate)(check_password_1.CheckPassword, {
            message: 'Неверный пароль!'
        })
    ], UpdateUserDto.prototype, "currPassword");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.Length)(8, 30)
    ], UpdateUserDto.prototype, "password");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.Validate)(compare_passwords_1.ComparePasswords, {
            message: 'Пароли не совпадают!'
        })
    ], UpdateUserDto.prototype, "confirmPassword");
    return UpdateUserDto;
}());
exports.UpdateUserDto = UpdateUserDto;
