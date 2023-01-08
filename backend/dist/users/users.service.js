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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const snippet_entity_1 = require("../entities/snippet.entity");
let UsersService = class UsersService {
    constructor(usersRepository, snippetsRepository) {
        this.usersRepository = usersRepository;
        this.snippetsRepository = snippetsRepository;
    }
    async findOne(id) {
        return this.usersRepository.findOneBy({ id });
    }
    async find(email) {
        return this.usersRepository.findOneBy({ email });
    }
    async findByLogin(login) {
        return this.usersRepository.findOneBy({ login });
    }
    create(createUserDto) {
        const user = new user_entity_1.Users();
        user.login = createUserDto.login;
        user.email = createUserDto.email.toLowerCase();
        user.password = createUserDto.password;
        return this.usersRepository.save(user);
    }
    async update(id, updateUserDto) {
        const { currPassword, confirmPassword } = updateUserDto, data = __rest(updateUserDto, ["currPassword", "confirmPassword"]);
        const currentUser = await this.usersRepository.findOneBy({ id });
        const updatedUser = this.usersRepository.merge(currentUser, data);
        await this.usersRepository.save(updatedUser);
        return updatedUser;
    }
    async delete(id) {
        await this.usersRepository.delete(id);
    }
    findAll() {
        return this.usersRepository.find();
    }
    async getData({ id }) {
        const currentUser = await this.usersRepository.findOneBy({ id });
        const snippets = await this.snippetsRepository.find({
            relations: {
                user: true,
            },
            where: {
                user: {
                    id,
                },
            },
        });
        return { currentUser, snippets };
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __param(1, (0, typeorm_1.InjectRepository)(snippet_entity_1.Snippets)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map