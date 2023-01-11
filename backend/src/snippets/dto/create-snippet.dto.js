"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateSnippetDto = void 0;
var class_validator_1 = require("class-validator");
var CreateSnippetDto = /** @class */ (function () {
    function CreateSnippetDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)()
    ], CreateSnippetDto.prototype, "code");
    __decorate([
        (0, class_validator_1.Length)(1, 30),
        (0, class_validator_1.IsString)()
    ], CreateSnippetDto.prototype, "name");
    return CreateSnippetDto;
}());
exports.CreateSnippetDto = CreateSnippetDto;
