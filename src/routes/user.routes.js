import { registerUser, loginUser , isAdmin } from '../controllers/users.controller.js';
import Router from 'express';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/isadmin',isAdmin);

export default router;