import express from 'express';
import 'dotenv/config';
import { bundle } from '@remotion/bundler';
import path from 'path';

import { job } from './jobs/dailyGenerate.job';
import { verifyInternalSecret } from './middleware/internal';

import generateRouter from './routes/generate.route';
import projectRouter from './routes/project.route';
import uploadRouter from './routes/upload.route';
import decisionRouter from './routes/decision.route';

const app = express();

app.use(express.json());
app.use('/outputs', express.static('outputs'));
app.use('/music-track', express.static('music-track'));

app.use(verifyInternalSecret);

export let bundleLocation: string;

const startServer = async () => {
  bundleLocation = await bundle({
    entryPoint: path.resolve('../../apps/remotion/src/index.ts'),
    webpackOverride: (config) => config,
  });

  job.start();
  app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));
  app.use('/api/generate', generateRouter);
  app.use('/api/projects', projectRouter);
  app.use('/api/upload', uploadRouter);
  app.use('/api/decision', decisionRouter);
  app.listen(3001, () => console.log('Server running on port 3001'));
};

startServer();
