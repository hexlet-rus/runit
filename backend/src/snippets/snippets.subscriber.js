"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SnippetSubscriber = void 0;
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
var typeorm_1 = require("typeorm");
var snippet_entity_1 = require("../entities/snippet.entity");
var SnippetSubscriber = /** @class */ (function () {
    function SnippetSubscriber(dataSource) {
        dataSource.subscribers.push(this);
    }
    SnippetSubscriber.prototype.listenTo = function () {
        return snippet_entity_1.Snippets;
    };
    SnippetSubscriber.prototype.beforeInsert = function (event) {
        console.log('BEFORE SNIPPET INSERTER: ', event.entity);
    };
    SnippetSubscriber = __decorate([
        (0, typeorm_1.EventSubscriber)()
    ], SnippetSubscriber);
    return SnippetSubscriber;
}());
exports.SnippetSubscriber = SnippetSubscriber;
