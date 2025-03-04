/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class MethodOverrideMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      req.method = req.body._method.toUpperCase();
      delete req.body._method;
    }
    next();
  }
}
