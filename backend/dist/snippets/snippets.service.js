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
exports.SnippetsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const snippet_entity_1 = require("../entities/snippet.entity");
let SnippetsService = class SnippetsService {
    constructor(snippetsRepository, usersRepository) {
        this.snippetsRepository = snippetsRepository;
        this.usersRepository = usersRepository;
    }
    async findOne(id) {
        return this.snippetsRepository.findOneBy({ id });
    }
    async create(createSnippetDto, { id }) {
        const snippet = new snippet_entity_1.Snippets();
        snippet.name = createSnippetDto.name;
        snippet.user = await this.usersRepository.findOneBy({ id });
        snippet.code = createSnippetDto.code;
        return this.snippetsRepository.save(snippet);
    }
    async update(id, updateSnippetDto) {
        await this.snippetsRepository.update(id, updateSnippetDto);
        return this.snippetsRepository.findOneBy({ id });
    }
    async delete(id) {
        await this.snippetsRepository.delete(id);
    }
    findAll() {
        return this.snippetsRepository.find();
    }
};
SnippetsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(snippet_entity_1.Snippets)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SnippetsService);
exports.SnippetsService = SnippetsService;
//# sourceMappingURL=snippets.service.js.map