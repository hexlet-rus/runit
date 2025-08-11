import { z } from 'zod';

// Валидация email (RFC 5322)
const emailSchema = z.string()
  .email()
  .max(254)
  .transform(val => val.toLowerCase().trim());

// Валидация пароля
const passwordSchema = z.string()
  .min(8)
  .regex(/^(?:(?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])|(?=.*[a-z])(?=.*\d)(?=.*[\W_])|(?=.*[A-Z])(?=.*\d)(?=.*[\W_])).{8,}$/);

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: z.string().min(3).max(20),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Пароль обязателен"),
});
