/* eslint-disable class-methods-use-this */
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class ComparePasswords implements ValidatorConstraintInterface {
  validate(text: string, validationArguments: ValidationArguments) {
    const { ...object }: any = validationArguments.object;
    return object.password === object.confirmPassword;
  }
}
