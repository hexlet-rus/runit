"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.SnippetsController = void 0;
/* eslint-disable no-useless-constructor */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
var common_1 = require("@nestjs/common");
var users_decorator_1 = require("../users/users.decorator");
var http_exception_filter_1 = require("./exceptions/http-exception.filter");
var parse_int_pipe_1 = require("./pipes/parse-int.pipe");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var validation_pipe_1 = require("./validation/validation.pipe");
var SnippetsController = /** @class */ (function () {
    function SnippetsController(snippetsService) {
        this.snippetsService = snippetsService;
    }
    SnippetsController.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.snippetsService.findAll()];
            });
        });
    };
    SnippetsController.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.snippetsService.findOne(id)];
            });
        });
    };
    SnippetsController.prototype.create = function (user, createSnippetDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.snippetsService.create(createSnippetDto, user)];
            });
        });
    };
    SnippetsController.prototype.update = function (id, updateSnippetDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.snippetsService.update(id, updateSnippetDto)];
            });
        });
    };
    SnippetsController.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.snippetsService["delete"](id)];
            });
        });
    };
    __decorate([
        (0, common_1.Get)()
    ], SnippetsController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id', new parse_int_pipe_1.ParseIntPipe()))
    ], SnippetsController.prototype, "findOne");
    __decorate([
        (0, common_1.Post)(),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, (0, users_decorator_1.User)('user')),
        __param(1, (0, common_1.Body)(new validation_pipe_1.ValidationPipe()))
    ], SnippetsController.prototype, "create");
    __decorate([
        (0, common_1.Put)(':id'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, (0, common_1.Param)('id', new parse_int_pipe_1.ParseIntPipe())),
        __param(1, (0, common_1.Body)(new validation_pipe_1.ValidationPipe()))
    ], SnippetsController.prototype, "update");
    __decorate([
        (0, common_1.Delete)(':id'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, (0, common_1.Param)('id', new parse_int_pipe_1.ParseIntPipe()))
    ], SnippetsController.prototype, "delete");
    SnippetsController = __decorate([
        (0, common_1.Controller)('snippets'),
        (0, common_1.UseFilters)(new http_exception_filter_1.HttpExceptionFilter())
    ], SnippetsController);
    return SnippetsController;
}());
exports.SnippetsController = SnippetsController;
