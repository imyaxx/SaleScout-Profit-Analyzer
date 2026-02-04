import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import recordsRoutes from './routes/records.js';
import analyzeRoutes from './routes/analyze.js';
import leadRoutes from './routes/lead.js';

dotenv.config();

const { MONGODB_URI, PORT, CORS_ORIGIN } = process.env;

if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI in environment');
  process.exit(1);
}

const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN ?? 'http://localhost:3000'
  })
);
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/records', recordsRoutes);
app.use('/api/analyze', analyzeRoutes);
app.use('/api/lead', leadRoutes);

async function start() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(MONGODB_URI);

  const port = Number(PORT) || 4000;
  app.listen(port, () => {
    console.log(`API listening on :${port}`);
  });
}

start().catch((error) => {
  console.error('Failed to start API', error);
  process.exit(1);
});
