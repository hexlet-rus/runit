import * as yup from 'yup';
import {
  username,
  email,
  password,
  required,
  confirmPassword,
} from '../../utils/validationSchemas';

export const createProfileEditSchema = () =>
  yup.object().shape({
    name: username(),
    login: username(),
    email: email(),
    currentPassword: required(),
    newPassword: password(),
    confirmPassword: confirmPassword(),
  });
