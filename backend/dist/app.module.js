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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const snippets_controller_1 = require("./snippets/snippets.controller");
const snippets_module_1 = require("./snippets/snippets.module");
const snippets_service_1 = require("./snippets/snippets.service");
const auth_module_1 = require("./auth/auth.module");
const users_controller_1 = require("./users/users.controller");
const users_service_1 = require("./users/users.service");
const users_module_1 = require("./users/users.module");
const auth_controller_1 = require("./auth/auth.controller");
const data_source_config_1 = require("./data-source.config");
const https_middleware_1 = require("./common/https.middleware");
const events_module_1 = require("./events/events.module");
let AppModule = class AppModule {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    configure(consumer) {
        consumer.apply(https_middleware_1.HttpsRedirectMiddleware).forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', '..', 'frontend/build'),
            }),
            snippets_module_1.SnippetsModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            events_module_1.EventsModule,
            typeorm_1.TypeOrmModule.forRoot((0, data_source_config_1.default)()),
        ],
        controllers: [
            app_controller_1.AppController,
            snippets_controller_1.SnippetsController,
            users_controller_1.UsersController,
            auth_controller_1.AuthController,
        ],
        providers: [app_service_1.AppService, snippets_service_1.SnippetsService, users_service_1.UsersService, auth_module_1.AuthModule],
    }),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map