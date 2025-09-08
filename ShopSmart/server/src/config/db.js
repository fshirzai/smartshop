import mongoose from 'mongoose';
import { env } from './env.js';
import { logger } from './logger.js';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    logger.info(`Mongo connected: ${conn.connection.host}`);
  } catch (err) {
    logger.error('Mongo connection failed');
    console.error(err);
    process.exit(1);
  }
};
