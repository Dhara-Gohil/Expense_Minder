import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import http from 'http'; 
import { Server } from 'socket.io';
import chatRoutes from './routes/Shopkeeper/chatRoutes.js';
import productRoutes from './routes/Shopkeeper/productRoutes.js';
import supplierRoutes from './routes/Shopkeeper/supplierRoutes.js';



dotenv.config();
const app = express();

app.use(cors()); // allow frontend requests
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // frontend URL
    methods: ['GET', 'POST'],
  },
});

// Connect DB
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/shopkeeper/chat', chatRoutes);

// Socket.io real-time
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chatMessage', (msg) => {
    socket.broadcast.emit('chatMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/shopkeeper/suppliers', supplierRoutes);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

