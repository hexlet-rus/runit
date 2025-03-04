import { join } from 'path';
import { I18nOptions } from 'nestjs-i18n';

export const i18nConfig: I18nOptions = {
  fallbackLanguage: 'en',
  loaderOptions: {
    path: join(__dirname, '..', '/i18n/'),
  },
  viewEngine: 'pug',
};
