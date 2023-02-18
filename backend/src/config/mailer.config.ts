import { MailerOptions } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

export default (): MailerOptions => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return {
        transport: process.env.TRANSPORT_MAILER_URL,
        defaults: {
          from: '"RunIT" <hexlet@runit.com>',
        },
        template: {
          dir: `${__dirname}/users/templates`,
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
        preview: true,
      };
    default:
      return {
        transport: 'smtp://localhost:1025',
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          dir: `${process.cwd()}/src/users/templates`,
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
        preview: true,
      };
  }
};
