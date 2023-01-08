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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const users_decorator_1 = require("./users.decorator");
const users_service_1 = require("./users.service");
const http_exception_filter_1 = require("./exceptions/http-exception.filter");
const parse_int_pipe_1 = require("./pipes/parse-int.pipe");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const validation_exception_filter_1 = require("./exceptions/validation-exception.filter");
const auth_service_1 = require("../auth/auth.service");
let UsersController = class UsersController {
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    async findAll() {
        return this.usersService.findAll();
    }
    async getProfile(user) {
        return this.usersService.getData(user);
    }
    async findOne(id) {
        return this.usersService.findOne(id);
    }
    async create(createUserDto, res) {
        const user = await this.usersService.create(createUserDto);
        return this.authService.login(user, res);
    }
    update(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    async delete(id) {
        return this.usersService.delete(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, users_decorator_1.User)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseFilters)(new validation_exception_filter_1.HttpValidationFilter()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseFilters)(new validation_exception_filter_1.HttpValidationFilter()),
    __param(0, (0, common_1.Param)('id', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseFilters)(new http_exception_filter_1.HttpExceptionFilter()),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map