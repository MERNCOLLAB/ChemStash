import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: Number,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    recipient: [
      {
        recipientId: {
          type: Number,
          required: true,
        },
        isRead: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
