import mongoose from 'mongoose';
import { logger } from '../utils/logger';

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    const err = error as Error;
    logger.error(`Error connecting to database: ${err.message}`);
    process.exit(1);
  }
};