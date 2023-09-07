import { MailerOptionsFactory, MailerOptions } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

export class MailerConfig implements MailerOptionsFactory {
  /* eslint-disable-next-line class-methods-use-this */
  createMailerOptions(): MailerOptions | Promise<MailerOptions> {
    const options: MailerOptions = {
      transport: process.env.TRANSPORT_MAILER_URL,
      defaults: {
        from: '"Run IT" <noreply@runit.hexlet.ru>',
      },
      template: {
        dir: `${process.cwd()}/src/users/templates`,
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    };

    switch (process.env.NODE_ENV) {
      case 'production':
        return options;
      default:
        // FIXME: use some test transport
        options.transport =
          process.env.TRANSPORT_MAILER_URL ??
          'smtp://test:test@imap.ethereal.email:587';
        options.preview = true;
        return options;
    }
  }
}
