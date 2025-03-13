/* eslint-disable no-useless-constructor */

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly configService: ConfigService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    let template: string;
    switch (status) {
      case 401:
        template = 'errors/401.pug';
        break;
      case 403:
        template = 'errors/403.pug';
        break;
      default:
        template = 'errors/500.pug';
    }
    const frontendUrl = this.configService.get<string>('app.frontendUrl');

    response.status(status).render(template, {
      statusCode: status,
      message: exception.message,
      frontendUrl,
    });
  }
}
