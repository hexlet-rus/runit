"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const check_email_1 = require("../validation/check-email");
const check_login_1 = require("../validation/check-login");
const compare_passwords_1 = require("../validation/compare-passwords");
class CreateUserDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(3, 20),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/[A-Za-z]/),
    (0, class_validator_1.Validate)(check_login_1.CheckLogin, {
        message: 'Пользователь уже существует!',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "login", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Validate)(check_email_1.CheckEmail, {
        message: 'Пользователь уже существует!',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(8, 30),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Validate)(compare_passwords_1.ComparePasswords, {
        message: 'Пароли не совпадают!',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "confirmPassword", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map