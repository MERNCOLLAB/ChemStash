import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import chemicalRoutes from './routes/chemical.route.js';
import mapRoutes from './routes/map.route.js';
import boardColumn from './routes/boardColumn.route.js';
import notificationRoutes from './routes/notification.route.js';
import task from './routes/task.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { Server } from 'socket.io';
import http from 'http';
const connectedUsers = {};
dotenv.config();

mongoose
  .connect(process.env.MONGOSHARED)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const __dirname = path.resolve();
const app = express();

// Create HTTP server and integrate Socket.IO
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: '*', // Adjust this as needed for your setup
  },
});

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  socket.on('joinRoom', (userId) => {
    socket.join(userId);
    connectedUsers[socket.id] = userId;
  });

  socket.on('disconnect', () => {
    const userId = connectedUsers[socket.id];
    if (userId) {
      socket.leave(userId);
      delete connectedUsers[socket.id];
    }
    console.log('umalis na ');
  });
});

// let onlineUsers = [];
// console.log(onlineUsers);
// const addNewUser = (username, socketId) => {
//   !onlineUsers.some((user) => user.username === username) && onlineUsers.push({ username, socketId });
// };
// const removeUser = (socketId) => {
//   onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
// };

// const getUser = (username) => {
//   return onlineUsers.find((user) => user.username === username);
// };
// io.on('connection', (socket) => {
//   socket.on('newUser', (username) => {
//     addNewUser(username, socket.id);
//   });

//   socket.on('sendNotification', ({ senderName, type }) => {
//     io.emit('getNotification', {
//       senderName,
//       type,
//     });
//   });

//   socket.on('disconnect', () => {
//     removeUser(socket.id);
//   });
// });

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chemical', chemicalRoutes);
app.use('/api/map', mapRoutes);
app.use('/api/board', boardColumn);
app.use('/api/board', task);
app.use('/api/notification', notificationRoutes);

app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
