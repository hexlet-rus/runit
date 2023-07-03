import { string } from 'yup';

export const login = () =>
  string()
    .trim()
    .required('signUp.validation.requiredField')
    .min(3, 'signUp.validation.usernameLength')
    .max(16, 'signUp.validation.usernameLength')
    .matches(/^[\w\S]*$/, 'signUp.validation.correctUsername');

export const email = () =>
  string()
    .trim()
    .required('signUp.validation.requiredField')
    .email('signUp.validation.correctEmail');

export const password = () =>
  string()
    .required('signUp.validation.requiredField')
    .min(8, 'signUp.validation.passwordLength')
    .max(30, 'signUp.validation.passwordLength');

export const confirmPassword = () =>
  string().test(
    'confirmPassword',
    'signUp.validation.confirmPassword',
    (value, context) => value === context.parent.password,
  );

export const replName = () =>
  string()
    .required('modals.validation.required')
    .max(20, 'modals.validation.snippetNameMaxLength')
    .matches(/^[a-zA-Z0-9_-]*$/, 'modals.validation.singleWord');
