import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePasswords = async (
  candidate: string,
  hashed: string
): Promise<boolean> => {
  return bcrypt.compare(candidate, hashed);
};
