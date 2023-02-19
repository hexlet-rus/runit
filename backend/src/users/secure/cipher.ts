import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const iv = randomBytes(16);
const cipherKey = process.env.CIPHER_KEY ?? 'ya4h67anyw46ga3wh45gq35ga3qwaw3h';

export const cipher = async (value: string) => {
  const newCipher = createCipheriv('aes-256-ctr', cipherKey, iv);

  const encryptedText = Buffer.concat([
    newCipher.update(value),
    newCipher.final(),
  ]);

  return encryptedText.toString('hex');
};

export const decipher = async (value: Buffer) => {
  const newDecipher = createDecipheriv('aes-256-ctr', cipherKey, iv);
  const decryptedText = Buffer.concat([
    newDecipher.update(value),
    newDecipher.final(),
  ]);

  return decryptedText.toString();
};
