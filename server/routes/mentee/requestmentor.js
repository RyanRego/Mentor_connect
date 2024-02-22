import express from 'express';
import {requestMentor} from '../../controllers/mentee/requestmentor.js'
const router = express.Router();

router.post('/',requestMentor)

export default router;