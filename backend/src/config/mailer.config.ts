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
        from: `"Run IT" <${configFromName(transportUrl)}>`,
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
          'smtp://user@example.org:236b45b9-b334-45b2-813b-4fab6308e389@app.debugmail.io:25';
        options.preview = true;
        return options;
    }
  }
}
