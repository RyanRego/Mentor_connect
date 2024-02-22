import express from 'express';
import {getAllSession} from "../../controllers/mentor/dashboard.js"
const router = express.Router();

router.post('/sessions',getAllSession)

export default router;