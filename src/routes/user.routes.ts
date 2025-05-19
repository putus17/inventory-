import { Router } from 'express';
import { 
    createUser,
    getUserById,
    updateUser
} from '../controllers/user.controller';

const router = Router();

router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);

export default router;
