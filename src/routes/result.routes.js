import {
    submitTest,
    getResults,
    resultsByUser
} from '../controllers/results.controller.js';

import Router from 'express';

const router = Router();

router.post('/submit', submitTest);
router.get('/', getResults);
router.get('/res', resultsByUser);

export default router;