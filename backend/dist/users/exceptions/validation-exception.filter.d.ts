import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
export declare class HttpValidationFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
