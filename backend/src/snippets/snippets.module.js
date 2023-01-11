"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SnippetsModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var jwt_1 = require("@nestjs/jwt");
var auth_service_1 = require("../auth/auth.service");
var user_entity_1 = require("../entities/user.entity");
var snippet_entity_1 = require("../entities/snippet.entity");
var snippets_controller_1 = require("./snippets.controller");
var snippets_service_1 = require("./snippets.service");
var snippets_subscriber_1 = require("./snippets.subscriber");
var users_service_1 = require("../users/users.service");
var SnippetsModule = /** @class */ (function () {
    function SnippetsModule() {
    }
    SnippetsModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([snippet_entity_1.Snippets, user_entity_1.Users])],
            controllers: [snippets_controller_1.SnippetsController],
            providers: [
                snippets_service_1.SnippetsService,
                snippets_subscriber_1.SnippetSubscriber,
                users_service_1.UsersService,
                jwt_1.JwtService,
                auth_service_1.AuthService,
            ],
            exports: [snippets_service_1.SnippetsService, typeorm_1.TypeOrmModule]
        })
    ], SnippetsModule);
    return SnippetsModule;
}());
exports.SnippetsModule = SnippetsModule;
