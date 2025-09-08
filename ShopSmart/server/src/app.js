import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import routes from './routes/index.js';
import { logger } from './config/logger.js';

export const app = express();

/* ---------- security & basics ---------- */
app.use(helmet());
app.use(cors({ origin: env.NODE_ENV === 'production' ? process.env.CLIENT_URL : true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(mongoSanitize());

/* ---------- logging ---------- */
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));

/* ---------- rate limit ---------- */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 200, // limit each IP to 200 requests per windowMs
  message: { success: false, message: 'Too many requests' },
});
app.use('/api', limiter);

/* ---------- health check ---------- */
app.get('/api/health', (_, res) => res.json({ success: true, message: 'API ready' }));

/* ---------- api routes ---------- */
app.use('/api', routes);

/* ---------- 404 handler ---------- */
app.all('*', (req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

/* ---------- central error handler ---------- */
app.use(errorHandler);
