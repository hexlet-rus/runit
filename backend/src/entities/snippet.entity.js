"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Snippets = void 0;
var typeorm_1 = require("typeorm");
var Snippets = /** @class */ (function () {
    function Snippets() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Snippets.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ "default": 'Untitled' })
    ], Snippets.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)()
    ], Snippets.prototype, "code");
    __decorate([
        (0, typeorm_1.ManyToOne)('Users', 'snippets', { onDelete: 'CASCADE' }),
        (0, typeorm_1.JoinColumn)()
    ], Snippets.prototype, "user");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Snippets.prototype, "created_at");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], Snippets.prototype, "updated_at");
    Snippets = __decorate([
        (0, typeorm_1.Entity)()
    ], Snippets);
    return Snippets;
}());
exports.Snippets = Snippets;
