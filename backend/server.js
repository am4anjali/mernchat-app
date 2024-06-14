import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import http from 'http';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from './socket/socket.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors()); // Enable CORS for all routes by default

// Route setup
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// Create HTTP server
const server = http.createServer(app);

// Start server and connect to the database
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
