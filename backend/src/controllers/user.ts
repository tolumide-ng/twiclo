import type { Request, Response } from 'express';
import users from '../data/user.json';
import followsData from '../data/follows.json';
import { ResponseGenerator } from '../helpers/responseGenerator';

export class ProfileController {
  static getProfile(req: Request, res: Response) {
    const { userName = '' } = req.params;

    if (userName) {
      const user = users.find((user) => user.username === userName);
      if (user) {
        let follows = followsData.find((u) => u.userid === user.id);

        return ResponseGenerator.sendSuccess(res, 200, { ...user, follows });
      }
      return ResponseGenerator.sendError(res, 404);
    }

    return ResponseGenerator.sendError(res, 400);
  }
}
