"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
/* eslint-disable class-methods-use-this */
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var serve_static_1 = require("@nestjs/serve-static");
var path_1 = require("path");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var snippets_controller_1 = require("./snippets/snippets.controller");
var snippets_module_1 = require("./snippets/snippets.module");
var snippets_service_1 = require("./snippets/snippets.service");
var auth_module_1 = require("./auth/auth.module");
var users_controller_1 = require("./users/users.controller");
var users_service_1 = require("./users/users.service");
var users_module_1 = require("./users/users.module");
var auth_controller_1 = require("./auth/auth.controller");
var data_source_config_1 = require("./data-source.config");
var https_middleware_1 = require("./common/https.middleware");
var events_module_1 = require("./events/events.module");
var AppModule = /** @class */ (function () {
    // eslint-disable-next-line no-useless-constructor
    function AppModule(dataSource) {
        this.dataSource = dataSource;
    }
    AppModule.prototype.configure = function (consumer) {
        consumer.apply(https_middleware_1.HttpsRedirectMiddleware).forRoutes('*');
    };
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                serve_static_1.ServeStaticModule.forRoot({
                    rootPath: (0, path_1.join)(__dirname, '..', '..', 'frontend/build')
                }),
                snippets_module_1.SnippetsModule,
                users_module_1.UsersModule,
                auth_module_1.AuthModule,
                events_module_1.EventsModule,
                typeorm_1.TypeOrmModule.forRoot((0, data_source_config_1["default"])()),
            ],
            controllers: [
                app_controller_1.AppController,
                snippets_controller_1.SnippetsController,
                users_controller_1.UsersController,
                auth_controller_1.AuthController,
            ],
            providers: [app_service_1.AppService, snippets_service_1.SnippetsService, users_service_1.UsersService, auth_module_1.AuthModule]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
