"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HttpValidationFilter = void 0;
/* eslint-disable class-methods-use-this */
var common_1 = require("@nestjs/common");
var HttpValidationFilter = /** @class */ (function () {
    function HttpValidationFilter() {
    }
    HttpValidationFilter.prototype["catch"] = function (exception, host) {
        var ctx = host.switchToHttp();
        var response = ctx.getResponse();
        var status = exception.getStatus();
        var errs = exception.getResponse();
        response.status(status).json({
            errs: errs
        });
    };
    HttpValidationFilter = __decorate([
        (0, common_1.Catch)(common_1.HttpException)
    ], HttpValidationFilter);
    return HttpValidationFilter;
}());
exports.HttpValidationFilter = HttpValidationFilter;
