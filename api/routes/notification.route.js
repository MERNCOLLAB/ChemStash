import express from 'express';
import {
  createNotification,
  NotificationList,
  markAllNotificationsAsSeen,
} from '../controllers/notification.controller.js';
const router = express.Router();

router.post('/create', createNotification);
router.get('/view/:userId', NotificationList);
router.patch('/seen/:userId', markAllNotificationsAsSeen);

export default router;
