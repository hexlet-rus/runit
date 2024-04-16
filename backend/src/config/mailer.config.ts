import { MailerOptionsFactory, MailerOptions } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

const configFromName = (transportUrl) => {
  const parts = transportUrl.replace('smtp://', '').split(':');
  const [emailName, otherInfo] = parts;
  const domain = otherInfo.split('.');
  const [,domName, dom] = domain;

  return `${emailName}@${domName}.${dom}`
}

export class MailerConfig implements MailerOptionsFactory {
  /* eslint-disable-next-line class-methods-use-this */
  createMailerOptions(): MailerOptions | Promise<MailerOptions> {
    const transportUrl = process.env.TRANSPORT_MAILER_URL;
    const options: MailerOptions = {
      transport: transportUrl,
      defaults: {
        from: `"Run IT" <${transportUrl ? configFromName(transportUrl) : "test"}>`,
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
        options.transport =
          process.env.TRANSPORT_MAILER_URL ??
          { jsonTransport: true }
        options.preview = true;
        return options;
    }
  }
}
