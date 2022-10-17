import * as bcrypt from 'bcrypt';

export const encrypt = (password: string) => {
  return bcrypt.hashSync(password, 10);
};
