import { t } from 'i18next';
import { string } from 'yup';

export const login = () =>
  string()
    .trim()
    .required(t('errors.validation.requiredField'))
    .min(3, t('errors.validation.usernameLength'))
    .max(16, t('errors.validation.usernameLength'))
    .matches(/^[\w\S]*$/, t('errors.validation.correctUsername'));

export const email = () =>
  string()
    .trim()
    .required(t('errors.validation.requiredField'))
    .email(t('errors.validation.correctEmail'));

export const password = () =>
  string()
    .trim()
    .required(t('errors.validation.correctEmail'))
    .min(8, t('errors.validation.passwordLength'))
    .max(30, t('errors.validation.passwordLength'));

export const confirmPassword = () =>
  string()
    .trim()
    .test(
      'confirmPassword',
      t('errors.validation.confirmPassword'),
      (value, context) => value === context.parent.password,
    );

export const replName = () =>
  string()
    .required(t('errors.validation.required'))
    .max(20, t('errors.validation.snippetNameMaxLength'))
    .matches(/^[a-zA-Z0-9_-]*$/, t('errors.validation.singleWord'));
