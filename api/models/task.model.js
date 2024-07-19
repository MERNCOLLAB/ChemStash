import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: 'Title',
    },
    desc: {
      type: String,
      default: 'Description',
    },
    columnId: {
      type: Number,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: Date,
      default: null,
    },
    priority: {
      type: Number,
    },
    assignedUsers: [
      {
        img: {
          type: String,
        },
        username: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Task = mongoose.model('taskBoard', taskSchema);

export default Task;
