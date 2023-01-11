"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HttpsRedirectMiddleware = void 0;
/* eslint-disable class-methods-use-this */
var common_1 = require("@nestjs/common");
var HttpsRedirectMiddleware = /** @class */ (function () {
    function HttpsRedirectMiddleware() {
    }
    HttpsRedirectMiddleware.prototype.use = function (req, res, next) {
        if (!req.secure && process.env.NODE_ENV === 'production') {
            var httpsUrl = "https://".concat(req.hostname).concat(req.originalUrl);
            res.redirect(common_1.HttpStatus.PERMANENT_REDIRECT, httpsUrl);
        }
        else {
            next();
        }
    };
    HttpsRedirectMiddleware = __decorate([
        (0, common_1.Injectable)()
    ], HttpsRedirectMiddleware);
    return HttpsRedirectMiddleware;
}());
exports.HttpsRedirectMiddleware = HttpsRedirectMiddleware;
