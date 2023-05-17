import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();
export const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('*', (req, _res, next) => {
  console.log('-----REQUEST LOGGER-----');
  console.log('request URL: ', req.originalUrl);
  console.log('request queries: ', { ...req.query });
  console.log('request body: ', req.body);
  console.log('-----END LOGGER-----');
  next();
});

import huntShowdownRouter from './routes/hunt-showdown';
app.use('/hunt_showdown', huntShowdownRouter);

import osrsRouter from './routes/osrs';
app.use('/osrs', osrsRouter);

import joeRouter from './routes/joewatermelon';
app.use('/joewatermelon', joeRouter);

app.get('/*', (req, res) => {
  console.log('404 request url: ', req.url);
  console.log('404 request queries: ', { ...req.query });
  res.status(404).send('The page you are looking for does not exist.');
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
