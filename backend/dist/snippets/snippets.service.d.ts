import { Repository } from 'typeorm';
import { Users } from '../entities/user.entity';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { Snippets } from '../entities/snippet.entity';
import { User } from '../users/interfaces/users.interface';
export declare class SnippetsService {
    private snippetsRepository;
    private usersRepository;
    constructor(snippetsRepository: Repository<Snippets>, usersRepository: Repository<Users>);
    findOne(id: number): Promise<Snippets>;
    create(createSnippetDto: CreateSnippetDto, { id }: User): Promise<Snippets>;
    update(id: number, updateSnippetDto: UpdateSnippetDto): Promise<Snippets>;
    delete(id: number): Promise<void>;
    findAll(): Promise<Snippets[]>;
}
