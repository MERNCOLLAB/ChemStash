import Notification from '../models/notification.model.js';
import User from '../models/user.model.js';
import UserFeed from '../models/userFeed.model.js';

export const createNotification = async (req, res, next) => {
  try {
    const { type, makerId } = req.body;
    const notification = new Notification({ text: type });
    await notification.save();

    const users = await User.find({ _id: { $ne: makerId } });

    const userFeeds = users.map((user) => ({
      user: user._id,
      notification: notification._id,
    }));

    await UserFeed.insertMany(userFeeds);

    res.status(201).json(notification);
  } catch (error) {
    next(error);
  }
};

export const viewNotification = async (req, res, next) => {
  try {
    const userFeeds = await UserFeed.find({ user: req.params.userId }).populate('notification');
    res.status(200).json(userFeeds);
  } catch (error) {
    next(error);
  }
};
