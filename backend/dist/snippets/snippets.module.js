"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnippetsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("../auth/auth.service");
const user_entity_1 = require("../entities/user.entity");
const snippet_entity_1 = require("../entities/snippet.entity");
const snippets_controller_1 = require("./snippets.controller");
const snippets_service_1 = require("./snippets.service");
const snippets_subscriber_1 = require("./snippets.subscriber");
const users_service_1 = require("../users/users.service");
let SnippetsModule = class SnippetsModule {
};
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
        exports: [snippets_service_1.SnippetsService, typeorm_1.TypeOrmModule],
    })
], SnippetsModule);
exports.SnippetsModule = SnippetsModule;
//# sourceMappingURL=snippets.module.js.map