import { Router } from 'express';
import { FeedController } from '../../controllers/feed';
import { hasXUserId } from '../../validators/hasXUserId';

const router = Router();

router.get('/', hasXUserId, FeedController.getFeedFor);
router.post('/', hasXUserId, FeedController.createPost);

export default router;
