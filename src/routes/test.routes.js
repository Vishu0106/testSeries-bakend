import { createTest,
    getAllTests,
    getTestById} from '../controllers/tests.controller.js';
import Router from 'express';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = Router();

router.post('/create', isAdmin, createTest);
router.get('/all', getAllTests);
router.get('/', getTestById);

export default router;