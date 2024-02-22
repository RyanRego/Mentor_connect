import express from 'express'
import { getRecommended } from '../../controllers/mentee/getRecommended.js';
const router = express.Router();

router.post('/',getRecommended);

export default router;