import express from 'express';
import { createNotification, viewNotification } from '../controllers/notification.controller.js';
const router = express.Router();

router.post('/create', createNotification);
router.get('/view/:userId', viewNotification);

export default router;
