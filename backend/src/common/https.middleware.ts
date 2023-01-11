/* eslint-disable class-methods-use-this */
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class HttpsRedirectMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    if (!req.secure && process.env.NODE_ENV === 'production') {
      const httpsUrl = `https://${req.hostname}${req.originalUrl}`;
      res.redirect(HttpStatus.PERMANENT_REDIRECT, httpsUrl);
    } else {
      next();
    }
  }
}
