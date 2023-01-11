"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersModule = void 0;
var common_1 = require("@nestjs/common");
var jwt_1 = require("@nestjs/jwt");
var typeorm_1 = require("@nestjs/typeorm");
var snippet_entity_1 = require("../entities/snippet.entity");
var auth_service_1 = require("../auth/auth.service");
var user_entity_1 = require("../entities/user.entity");
var users_controller_1 = require("./users.controller");
var users_service_1 = require("./users.service");
var users_subscriber_1 = require("./users.subscriber");
var check_email_1 = require("./validation/check-email");
var check_login_1 = require("./validation/check-login");
var check_password_1 = require("./validation/check-password");
var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.Users, snippet_entity_1.Snippets])],
            controllers: [users_controller_1.UsersController],
            providers: [
                users_service_1.UsersService,
                users_subscriber_1.UsersSubscriber,
                auth_service_1.AuthService,
                jwt_1.JwtService,
                check_email_1.CheckEmail,
                check_login_1.CheckLogin,
                check_password_1.CheckPassword,
            ],
            exports: [users_service_1.UsersService, typeorm_1.TypeOrmModule]
        })
    ], UsersModule);
    return UsersModule;
}());
exports.UsersModule = UsersModule;
