import { string } from 'yup';

export const login = () =>
  string()
    .trim()
    .required('errors.validation.requiredField')
    .min(3, 'errors.validation.usernameLength')
    .max(16, 'errors.validation.usernameLength')
    .matches(/^[\w\S]*$/, 'errors.validation.correctUsername');

export const email = () =>
  string()
    .trim()
    .required('errors.validation.requiredField')
    .email('errors.validation.correctEmail');

export const password = () =>
  string()
    .trim()
    .required('errors.validation.correctEmail')
    .min(8, 'errors.validation.passwordLength')
    .max(30, 'errors.validation.passwordLength');

export const confirmPassword = () =>
  string()
    .trim()
    .test(
      'confirmPassword',
      'errors.validation.confirmPassword',
      (value, context) => value === context.parent.password,
    );

export const replName = () =>
  string()
    .required('errors.validation.requiredField')
    .max(20, 'errors.validation.snippetNameMaxLength')
    .matches(/^[a-zA-Z0-9_-]*$/, 'errors.validation.singleWord');
