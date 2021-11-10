import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR_MESSAGE } from 'src/constants/exception-messages';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const exceptionResponse: any = exception.getResponse();
    const status: number =
      exceptionResponse?.statusCode ?? exceptionResponse?.status ?? 500;

    const logger = new Logger();
    const httpMessage = {
      request: {
        url: request.baseUrl,
        method: request.method,
        query: request.query,
        body: request.body,
        params: request.params,
      },
      response: exceptionResponse?.response ?? exceptionResponse,
    };
    logger.error(httpMessage);

    const convertResponse: any =
      status === 500
        ? {
            message: INTERNAL_SERVER_ERROR_MESSAGE,
            error: 'InternalServerError',
          }
        : exceptionResponse?.response ?? exceptionResponse;

    response.status(status).json({
      statusCode: status,
      message: convertResponse.message,
      error: convertResponse.error,
    });
  }
}
