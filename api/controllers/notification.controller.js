import Notification from '../models/notification.model.js';
import User from '../models/user.model.js';
import UserFeed from '../models/userFeed.model.js';
import { io } from '../index.js';
export const createNotification = async (req, res, next) => {
  try {
    const { type, makerId, maker, title } = req.body;
    const notification = new Notification({ text: type, maker, title });
    await notification.save();

    const users = await User.find({ _id: { $ne: makerId } });

    const userFeeds = users.map((user) => ({
      user: user._id,
      notification: notification._id,
    }));

    await UserFeed.insertMany(userFeeds);
    users.forEach((user) => {
      io.to(user._id.toString()).emit('newNotification', notification);
    });
    res.status(201).json(notification);
  } catch (error) {
    next(error);
  }
};

export const NotificationList = async (req, res, next) => {
  try {
    const userFeeds = await UserFeed.find({ user: req.params.userId }).populate('notification');
    res.status(200).json(userFeeds);
  } catch (error) {
    next(error);
  }
};

export const markAllNotificationsAsSeen = async (req, res, next) => {
  try {
    await UserFeed.updateMany({ user: req.params.userId, isSeen: false }, { $set: { isSeen: true } });
    res.status(200).json({ message: 'All notifications marked as seen' });
  } catch (error) {
    next(error);
  }
};
