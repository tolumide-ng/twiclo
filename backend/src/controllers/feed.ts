import type { Request, Response } from 'express';
import feedJson from '../data/feed.json' assert { type: 'json' };
import userJson from '../data/user.json' assert { type: 'json' };
import followings from '../data/followings.json';
import { ResponseGenerator } from '../helpers/responseGenerator';
import { v4 as uuidv4 } from 'uuid';

type FeedPost = (typeof feedJson)[number];
const feed = [...feedJson];

export class FeedController {
  static attachAuthor(post: FeedPost) {
    const author = userJson.find((u) => u.id === post.author);
    return {
      ...post,
      author,
    };
  }

  static sortByTimestampDesc(posts: { timestamp: string }[]) {
    return posts.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
  }

  static getFeedFor(req: Request, res: Response) {
    const { userName = '', postId = '' } = req.query;
    const authorId = req.headers['x-user-id'] ?? '';

    // Profile feed
    if (userName) {
      const profileFeed = feed
        .map(FeedController.attachAuthor)
        .filter(({ author }) => author?.username === userName);

      return ResponseGenerator.sendSuccess(
        res,
        200,
        FeedController.sortByTimestampDesc(profileFeed),
      );
    }

    // Single post and its replies
    if (postId) {
      const associatedPost = feed
        .filter(({ id, replyId }) => id === postId || replyId === postId)
        .map(FeedController.attachAuthor);

      return ResponseGenerator.sendSuccess(
        res,
        200,
        FeedController.sortByTimestampDesc(associatedPost),
      );
    }

    const userFollows = followings.find((f) => f.userId === authorId);
    const homeFeed = (
      userFollows?.following.length
        ? feed.filter((post) => userFollows.following.includes(post.author))
        : feed
            .slice()
            .sort((a, b) => b.rtsCount - a.rtsCount)
            .slice(0, 3)
    ).map(FeedController.attachAuthor);

    return ResponseGenerator.sendSuccess(
      res,
      200,
      FeedController.sortByTimestampDesc(homeFeed),
    );
  }

  static createPost(req: Request, res: Response) {
    const authorId = String(req.headers['x-user-id']);
    const { post, replyId } = req.body;

    if (!post || typeof post !== 'string') {
      return ResponseGenerator.sendError(res, 400, 'Post content is required');
    }

    if (post.length > 280) {
      return ResponseGenerator.sendError(
        res,
        400,
        'Post exceeds 280 characters',
      );
    }

    const newPost = {
      id: uuidv4(),
      post,
      timestamp: new Date().toISOString(),
      rtsCount: 0,
      repliesCount: 0,
      ...(replyId ? { replyId } : {}),
      author: authorId,
    };

    feed.push(newPost);

    return ResponseGenerator.sendSuccess(
      res,
      201,
      FeedController.attachAuthor(newPost),
    );
  }
}
