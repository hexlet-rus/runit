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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const encrypt_1 = require("../users/secure/encrypt");
let Users = class Users {
    async hashPassword() {
        this.password = (0, encrypt_1.encrypt)(this.password);
    }
    async loadTempPassword() {
        this.tempPassword = this.password;
    }
    async hashPasswordIfNew() {
        if (this.tempPassword !== this.password) {
            this.password = (0, encrypt_1.encrypt)(this.password);
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Users.prototype, "login", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('Snippets', 'user'),
    __metadata("design:type", Array)
], Users.prototype, "snippets", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], Users.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", String)
], Users.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Users.prototype, "hashPassword", null);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Users.prototype, "loadTempPassword", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Users.prototype, "hashPasswordIfNew", null);
Users = __decorate([
    (0, typeorm_1.Entity)()
], Users);
exports.Users = Users;
//# sourceMappingURL=user.entity.js.map