import { string } from 'yup';

const USERNAME_MIN_LENGHT = 3;
const USERNAME_MAX_LENGHT = 16;

const PASSWORD_MIN_LENGHT = 8;
const PASSWORD_MAX_LENGHT = 30;

const SNIPPET_NAME_MAX_LENGHT = 30;

export const username = () =>
  string()
    .trim()
    .required('errors.validation.requiredField')
    .min(USERNAME_MIN_LENGHT, 'errors.validation.usernameLength')
    .max(USERNAME_MAX_LENGHT, 'errors.validation.usernameLength')
    .matches(/^[\w\S]*$/, 'errors.validation.incorrectUsername');

export const email = () =>
  string()
    .trim()
    .required('errors.validation.requiredField')
    .email('errors.validation.incorrectEmail');

export const password = () =>
  string()
    .trim()
    .required('errors.validation.requiredField')
    .min(PASSWORD_MIN_LENGHT, 'errors.validation.passwordLength')
    .max(PASSWORD_MAX_LENGHT, 'errors.validation.passwordLength');

export const required = () =>
  string().trim().required('errors.validation.requiredField');

export const confirmPassword = () =>
  string()
    .trim()
    .test(
      'confirmPassword',
      'errors.validation.confirmPassword',
      (value, context) => value === context.parent.password,
    );

export const snippetName = () =>
  string()
    .required('errors.validation.requiredField')
    .max(SNIPPET_NAME_MAX_LENGHT, 'errors.validation.snippetNameMaxLength')
    .matches(/^[a-zA-Z0-9._-]*$/, 'errors.validation.singleWord');
