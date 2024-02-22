import express from 'express';
import {getAllMentorsProfile} from '../controllers/mentor.getAll.js';
import {getRequestor} from '../controllers/getRequestor.js';
const router = express.Router();

router.get('/getAll',getAllMentorsProfile);
router.post('/getRequestor',getRequestor);
export default router;