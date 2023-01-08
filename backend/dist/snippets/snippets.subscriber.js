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
exports.SnippetSubscriber = void 0;
const typeorm_1 = require("typeorm");
const snippet_entity_1 = require("../entities/snippet.entity");
let SnippetSubscriber = class SnippetSubscriber {
    constructor(dataSource) {
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return snippet_entity_1.Snippets;
    }
    beforeInsert(event) {
        console.log('BEFORE SNIPPET INSERTER: ', event.entity);
    }
};
SnippetSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], SnippetSubscriber);
exports.SnippetSubscriber = SnippetSubscriber;
//# sourceMappingURL=snippets.subscriber.js.map