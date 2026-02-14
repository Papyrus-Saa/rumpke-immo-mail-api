import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let error = {
      code: 'UNKNOWN_ERROR',
      message: 'An error occurred',
      details: {},
    };

    if (typeof exceptionResponse === 'object') {
      error = {
        code: (exceptionResponse as any).code || 'UNKNOWN_ERROR',
        message: (exceptionResponse as any).message || exception.message,
        details: (exceptionResponse as any).details || {},
      };
    } else if (typeof exceptionResponse === 'string') {
      error.message = exceptionResponse;
    }

    response.status(status).json({ error });
  }
}
