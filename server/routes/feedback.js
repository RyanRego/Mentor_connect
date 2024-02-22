import express from 'express';
import { feedback } from '../controllers/feedback.js';
const router = express.Router();

router.post('/', feedback);

export default router;