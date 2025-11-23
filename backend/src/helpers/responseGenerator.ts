import { type Response } from 'express';

type StatusCode = {
  [k: number]: string;
};

export class ResponseGenerator {
  static readonly codeResponse: StatusCode = {
    404: 'Resource Not Found',
    400: 'Bad Request',
    500: 'Internal Server Error',
    200: 'Success',
    201: 'Created',
    401: 'Authentication Error',
  };

  static sendError(res: Response, statusCode: number, message?: string) {
    const responseMessage = message ?? this.codeResponse[statusCode];
    return res
      .status(statusCode)
      .send({ statusCode, message: responseMessage });
  }

  static sendSuccess<T = unknown>(res: Response, statusCode: number, data: T) {
    return res.status(statusCode).send({
      statusCode,
      message: this.codeResponse[statusCode],
      data,
    });
  }
}
