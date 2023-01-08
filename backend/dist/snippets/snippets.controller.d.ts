import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { Snippet } from './interfaces/snippets.interface';
import { SnippetsService } from './snippets.service';
import { User } from '../users/interfaces/users.interface';
export declare class SnippetsController {
    private snippetsService;
    constructor(snippetsService: SnippetsService);
    findAll(): Promise<Snippet[]>;
    findOne(id: number): Promise<Snippet>;
    create(user: User, createSnippetDto: CreateSnippetDto): Promise<import("../entities/snippet.entity").Snippets>;
    update(id: number, updateSnippetDto: UpdateSnippetDto): Promise<import("../entities/snippet.entity").Snippets>;
    delete(id: number): Promise<void>;
}
