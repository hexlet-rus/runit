"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const snippet_entity_1 = require("../entities/snippet.entity");
const auth_service_1 = require("../auth/auth.service");
const user_entity_1 = require("../entities/user.entity");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
const users_subscriber_1 = require("./users.subscriber");
const check_email_1 = require("./validation/check-email");
const check_login_1 = require("./validation/check-login");
const check_password_1 = require("./validation/check-password");
let UsersModule = class UsersModule {
};
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
        exports: [users_service_1.UsersService, typeorm_1.TypeOrmModule],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map