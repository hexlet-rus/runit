import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from '../entities/user.entity';
import { Snippets } from '../entities/snippet.entity';
import { User } from './interfaces/users.interface';
export declare class UsersService {
    private usersRepository;
    private snippetsRepository;
    constructor(usersRepository: Repository<Users>, snippetsRepository: Repository<Snippets>);
    findOne(id: number): Promise<Users>;
    find(email: string): Promise<Users>;
    findByLogin(login: string): Promise<Users>;
    create(createUserDto: CreateUserDto): Promise<Users>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<Users>;
    delete(id: number): Promise<void>;
    findAll(): Promise<Users[]>;
    getData({ id }: User): Promise<any>;
}
