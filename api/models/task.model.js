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
    },
    columnId: {
      type: Number,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model('taskBoard', taskSchema);

export default Task;
