import 'express';

declare module 'express' {
  interface Request {
    flash(type: string, message?: string): void;
    flash(message: string): void;
  }
}
