import mongoose from 'mongoose';
const userFeedSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  notification: { type: mongoose.Schema.Types.ObjectId, ref: 'Notification', required: true },
  isSeen: { type: Boolean, default: false },
  isClicked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const UserFeed = mongoose.model('UserFeed', userFeedSchema);

export default UserFeed;
