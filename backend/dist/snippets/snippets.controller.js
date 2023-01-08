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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnippetsController = void 0;
const common_1 = require("@nestjs/common");
const users_decorator_1 = require("../users/users.decorator");
const create_snippet_dto_1 = require("./dto/create-snippet.dto");
const update_snippet_dto_1 = require("./dto/update-snippet.dto");
const snippets_service_1 = require("./snippets.service");
const http_exception_filter_1 = require("./exceptions/http-exception.filter");
const parse_int_pipe_1 = require("./pipes/parse-int.pipe");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const validation_pipe_1 = require("./validation/validation.pipe");
let SnippetsController = class SnippetsController {
    constructor(snippetsService) {
        this.snippetsService = snippetsService;
    }
    async findAll() {
        return this.snippetsService.findAll();
    }
    async findOne(id) {
        return this.snippetsService.findOne(id);
    }
    async create(user, createSnippetDto) {
        return this.snippetsService.create(createSnippetDto, user);
    }
    async update(id, updateSnippetDto) {
        return this.snippetsService.update(id, updateSnippetDto);
    }
    async delete(id) {
        return this.snippetsService.delete(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SnippetsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SnippetsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, users_decorator_1.User)('user')),
    __param(1, (0, common_1.Body)(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_snippet_dto_1.CreateSnippetDto]),
    __metadata("design:returntype", Promise)
], SnippetsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, (0, common_1.Body)(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_snippet_dto_1.UpdateSnippetDto]),
    __metadata("design:returntype", Promise)
], SnippetsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SnippetsController.prototype, "delete", null);
SnippetsController = __decorate([
    (0, common_1.Controller)('snippets'),
    (0, common_1.UseFilters)(new http_exception_filter_1.HttpExceptionFilter()),
    __metadata("design:paramtypes", [snippets_service_1.SnippetsService])
], SnippetsController);
exports.SnippetsController = SnippetsController;
//# sourceMappingURL=snippets.controller.js.map