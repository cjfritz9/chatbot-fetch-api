import express from 'express';
import getDogTreat from '../utils/joewatermelon';

const joeRouter = express.Router();

joeRouter.get('/auth', (req, _res) => {
  console.log('full request: ', req)
  console.log('request url: ', req.url)
  console.log('request original url: ', req.originalUrl)
});

joeRouter.get('/dog_treat', (_req, res) => {
  res.send(getDogTreat());
});

export default joeRouter;
