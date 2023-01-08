import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
import { UsersService } from '../users.service';
export declare class CheckEmail implements ValidatorConstraintInterface {
    private usersService;
    constructor(usersService: UsersService);
    validate(text: string, validationArguments: ValidationArguments): Promise<boolean>;
}
