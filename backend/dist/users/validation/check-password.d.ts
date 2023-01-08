import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
import { UsersService } from '../users.service';
export declare class CheckPassword implements ValidatorConstraintInterface {
    private usersService;
    constructor(usersService: UsersService);
    validate(text: string, validationArguments: ValidationArguments): Promise<boolean>;
}
