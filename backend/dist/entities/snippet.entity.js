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
exports.Snippets = void 0;
const typeorm_1 = require("typeorm");
let Snippets = class Snippets {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Snippets.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Untitled' }),
    __metadata("design:type", String)
], Snippets.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Snippets.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Users', 'snippets', { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Function)
], Snippets.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], Snippets.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", String)
], Snippets.prototype, "updated_at", void 0);
Snippets = __decorate([
    (0, typeorm_1.Entity)()
], Snippets);
exports.Snippets = Snippets;
//# sourceMappingURL=snippet.entity.js.map