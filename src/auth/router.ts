import { FastifyInstance } from 'fastify';
import { registerSchema, loginSchema } from './schemas';
import { hashPassword, comparePasswords } from './utils';
import { generateAccessToken, generateRefreshToken } from './tokens';
import { UserDatabase } from '../db/users';

export const authRouter = async (server: FastifyInstance) => {
  server.post('/register', async (request, reply) => {
    const { email, password, username } = registerSchema.parse(request.body);

    // Проверка на существующего пользователя
    const existingUser = await UserDatabase.getUserByEmail(email);
    if (existingUser) {
      throw new Error('Email уже используется');
    }

    // Хеширование пароля
    const hashedPassword = await hashPassword(password);

    // Создание пользователя
    const user = await UserDatabase.createUser({
      email,
      password: hashedPassword,
      username,
    });

    // Генерация токенов
    const accessToken = generateAccessToken(server, user.id);
    const refreshToken = generateRefreshToken(server, user.id);

    // Установка refreshToken в куки
    reply.setCookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 дней
    });

    return { accessToken, user };
  });

  server.post('/login', async (request, reply) => {
    const { email, password } = loginSchema.parse(request.body);

    // Поиск пользователя
    const user = await UserDatabase.getUserByEmail(email);
    if (!user) {
      throw new Error('Неверный email или пароль');
    }

    // Проверка пароля
    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      throw new Error('Неверный email или пароль');
    }

    // Генерация токенов
    const accessToken = generateAccessToken(server, user.id);
    const refreshToken = generateRefreshToken(server, user.id);

    // Куки
    reply.setCookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return { accessToken, user };
  });
};
