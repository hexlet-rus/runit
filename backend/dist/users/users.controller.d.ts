import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/users.interface';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
export declare class UsersController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    findAll(): Promise<User[]>;
    getProfile(user: User): Promise<any>;
    findOne(id: number): Promise<User>;
    create(createUserDto: CreateUserDto, res: any): Promise<void>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("../entities/user.entity").Users>;
    delete(id: number): Promise<void>;
}
