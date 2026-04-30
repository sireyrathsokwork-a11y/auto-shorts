import express from 'express';
import 'dotenv/config';
import { bundle } from '@remotion/bundler';
import path from 'path';
import generateRouter from './routes/generate.route';
import projectRouter from './routes/project.route';
import uploadRouter from './routes/upload.route';

const app = express();
app.use(express.json());

export let bundleLocation: string;

const startServer = async () => {
  bundleLocation = await bundle({
    entryPoint: path.resolve('../../apps/remotion/src/index.ts'),
    webpackOverride: (config) => config,
  });

  app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));
  app.use('/api/generate', generateRouter);
  app.use('/api/projects', projectRouter);
  app.use('/api/upload', uploadRouter);

  app.listen(3001, () => console.log('Server running on port 3001'));
};

startServer();
