import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();
export const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('*', (req, _res, next) => {
  console.info('-----BEGIN REQUEST-----');
  console.info('URL: ', req.originalUrl);
  console.info('Headers: ', req.headers);
  console.info('Queries: ', req.query);
  console.info('Body: ', req.body);
  console.info('-----END REQUEST-----');
  next();
});

import generalRouter from './routes/general';
app.use('/general', generalRouter);

import huntShowdownRouter from './routes/hunt-showdown';
app.use('/hunt_showdown', huntShowdownRouter);

import osrsRouter from './routes/osrs';
app.use('/osrs', osrsRouter);

import joeRouter from './routes/joewatermelon';
app.use('/joewatermelon', joeRouter);

import twitchEventSubRouter from './routes/twitch-eventsub';
app.use('/twitch', twitchEventSubRouter);

app.get('/*', (req, res) => {
  console.log('404 request url: ', req.url);
  console.log('404 request queries: ', { ...req.query });
  res.status(404).send('The page you are looking for does not exist.');
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
