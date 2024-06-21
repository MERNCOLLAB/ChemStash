import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
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
