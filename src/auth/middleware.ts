import { FastifyRequest, FastifyReply } from 'fastify';

export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    await request.jwtVerify(); // Проверка accessToken из заголовка Authorization
  } catch (err) {
    reply.status(401).send({ error: 'Не авторизован' });
  }
};
