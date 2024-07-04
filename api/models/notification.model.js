import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    maker: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
