import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import workoutRoutes from './routes/workoutRoutes';
import { errorHandler } from './middleware/errorMiddleware';
import {JwtPayload} from "./types/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);

const start = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    const port = process.env.PORT;

    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoUri);

    app.listen(port, () => {
      console.log('Server running on http://localhost:' + port);
    });
  } catch (err) {
    console.error('Error starting the server:', err);
  }
};

start();
