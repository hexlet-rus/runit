"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersSubscriber = void 0;
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../entities/user.entity");
var UsersSubscriber = /** @class */ (function () {
    function UsersSubscriber(dataSource) {
        dataSource.subscribers.push(this);
    }
    UsersSubscriber.prototype.listenTo = function () {
        return user_entity_1.Users;
    };
    UsersSubscriber.prototype.beforeInsert = function (event) {
        console.log('BEFORE USER INSERTER: ', event.entity);
    };
    UsersSubscriber = __decorate([
        (0, typeorm_1.EventSubscriber)()
    ], UsersSubscriber);
    return UsersSubscriber;
}());
exports.UsersSubscriber = UsersSubscriber;
