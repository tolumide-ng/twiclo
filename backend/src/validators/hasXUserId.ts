import { ResponseGenerator } from '../helpers/responseGenerator';
import type { RequestHandler } from 'express';

export const hasXUserId: RequestHandler = (req, res, next) => {
  const token = req.headers['x-user-id'];

  if (!token) {
    return ResponseGenerator.sendError(res, 400, 'x-user-id is missen');
  }

  return next();
};
