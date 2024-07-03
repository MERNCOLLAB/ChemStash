import Notification from '../models/notification.model.js';
import User from '../models/user.model.js';

export const createNotification = async (req, res, next) => {
  const { type, sender, recipient } = req.body;

  const notification = new Notification({
    type,
    sender,
    recipient,
  });
  try {
    await notification.save();

    res.status(200).json({ message: 'Notification has been created' });
  } catch (error) {
    next(error);
  }
};

export const viewNotification = async (req, res, next) => {
  const { name } = req.body;
  try {
    const user = await User.find(
      {
        username: {
          $ne: name,
        },
      },
      'username'
    );
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
