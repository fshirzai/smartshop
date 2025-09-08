import { env } from './src/config/env.js';
import { connectDB } from './src/config/db.js';
import { logger } from './src/config/logger.js';
import { app } from './src/app.js';

const start = async () => {
  try {
    await connectDB();
    app.listen(env.PORT, () => logger.info(`Server running on port ${env.PORT}`));
  } catch (err) {
    logger.error('Boot failed');
    console.error(err);
    process.exit(1);
  }
};

start();
