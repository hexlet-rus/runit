import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  frontendUrl: process.env.RENDER
    ? process.env.RENDER_EXTERNAL_URL
    : process.env.FRONTEND_URL,
}));
