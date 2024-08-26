import { MailerOptionsFactory, MailerOptions } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

export class MailerConfig implements MailerOptionsFactory {
  /* eslint-disable-next-line class-methods-use-this */
  createMailerOptions(): MailerOptions | Promise<MailerOptions> {
    const transportUrl = process.env.TRANSPORT_MAILER_URL;
    const emailFrom = process.env.EMAIL_FROM ?? 'runit@localhost';
    const options: MailerOptions = {
      transport: transportUrl,
      defaults: {
        // NOTE: use runit.hexlet.ru domain for production
        from: `"Run IT" <${emailFrom}>`,
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
        options.transport = process.env.TRANSPORT_MAILER_URL ?? {
          jsonTransport: true,
        };
        options.preview = true;
        return options;
    }
  }
}
