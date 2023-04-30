import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();
export const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors({ origin: '*' }));

import huntShowdownRouter from './routes/hunt_showdown';
app.use('/hunt_showdown', huntShowdownRouter);

import osrsRouter from './routes/osrs';
app.use('/osrs', osrsRouter);

import joeRouter from './routes/joewatermelon';
app.use('/joewatermelon', joeRouter);

app.get('/*', (req, res) => {
  console.log('request url: ', req.url)
  console.log('request user query: ', req.query.user)
  res.status(404).send('The page you are looking for does not exist.')
})

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
