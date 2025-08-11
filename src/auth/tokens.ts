import { FastifyInstance } from 'fastify';

export const generateAccessToken = (server: FastifyInstance, userId: number) => {
  return server.jwt.sign(
    { userId },
    { expiresIn: '15m' } // Короткое время жизни
  );
};

export const generateRefreshToken = (server: FastifyInstance, userId: number) => {
  return server.jwt.sign(
    { userId },
    { expiresIn: '7d' } // Долгая жизнь
  );
};
