import express from 'express';
import { acceptRequest } from '../controllers/requests.js';
const router = express.Router();

router.post('/acceptRequest', acceptRequest);

export default router;