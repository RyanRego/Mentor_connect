import express from 'express';
import {editInfo} from '../../controllers/mentee/info.js';
const router = express.Router();

router.post('/edit',editInfo)

export default router;