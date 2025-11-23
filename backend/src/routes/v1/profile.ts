import { Router } from 'express';
import { hasXUserId } from '../../validators/hasXUserId';
import { ProfileController } from '../../controllers/user';

const router = Router();

router.get('/:userName', hasXUserId, ProfileController.getProfile);

export default router;
