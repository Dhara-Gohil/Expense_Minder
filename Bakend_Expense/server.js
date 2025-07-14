import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import http from 'http'; 
import { Server } from 'socket.io';
//import chatRoutes from './routes/Shopkeeper/chatRoutes.js';
import productRoutes from './routes/Shopkeeper/productRoutes.js';
import supplierRoutes from './routes/Shopkeeper/supplierRoutes.js';
import supplierProductRoutes from './routes/supplier/productRoutes.js'; 
import invoiceRoutes from './routes/supplier/invoiceRoutes.js';

//import supplierChatRoutes from './routes/supplier/supplierChatRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import shopkeeperRoutes from './routes/Shopkeeper/shopkeeperRoutes.js';


import contactRoutes from './routes/contactRoutes.js';


dotenv.config();
const app = express();

app.use(cors({
  origin: ["https://expenseminder0.onrender.com", "http://localhost:3000"],
  credentials: true
})); // allow frontend requests
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://expenseminder0.onrender.com', // frontend URL
    methods: ['GET', 'POST'],
  },
});


mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
//app.use('/api/shopkeeper/chat', chatRoutes);

// Socket.io real-time
io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/shopkeeper/suppliers', supplierRoutes);
app.use('/api/supplier/shopkeepers', shopkeeperRoutes);
app.use('/api/supplier', supplierProductRoutes);
app.use('/api/supplier/invoice', invoiceRoutes);
app.use('/api/supplier/chat', chatRoutes);
app.use('/api/Shopkeeper/chat', chatRoutes);
app.use('/api/contact', contactRoutes);
//app.use('/api/supplier/chat', supplierChatRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

