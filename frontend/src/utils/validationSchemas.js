import { toASCII } from 'punycode/';
import isEmail from 'validator/es/lib/isEmail';
import { string } from 'yup';

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 16;

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 30;
const PASSWORD_REGEX = /^[a-zA-Z0-9!'#%&'()*+,-./:;<=>?@[/\]^_{|}~]*$/;

export const SNIPPET_NAME_MAX_LENGTH = 30;

export const username = () =>
  string()
    .trim()
    .required('errors.validation.requiredField')
    .min(USERNAME_MIN_LENGTH, 'errors.validation.usernameLength')
    .max(USERNAME_MAX_LENGTH, 'errors.validation.usernameLength')
    .matches(/^[\w\S]*$/, 'errors.validation.incorrectUsername');

export const email = () =>
  string()
    .trim()
    .required('errors.validation.requiredField')
    .test('is-email', 'errors.validation.incorrectEmail', (v) => isEmail(v))
    .transform(toASCII);

export const password = () =>
  string()
    .required('errors.validation.requiredField')
    .matches(PASSWORD_REGEX, 'errors.validation.incorrectPassword')
    .min(PASSWORD_MIN_LENGTH, 'errors.validation.passwordLength')
    .max(PASSWORD_MAX_LENGTH, 'errors.validation.passwordLength');

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
    .max(SNIPPET_NAME_MAX_LENGTH, 'errors.validation.snippetNameMaxLength')
    .matches(/^[a-zA-Z0-9._-]*$/, 'errors.validation.singleWord');
