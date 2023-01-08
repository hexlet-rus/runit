import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class ComparePasswords implements ValidatorConstraintInterface {
    validate(text: string, validationArguments: ValidationArguments): boolean;
}
