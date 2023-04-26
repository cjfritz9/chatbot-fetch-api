import express from 'express';
import getDogTreat from '../utils/joewatermelon';

const joeRouter = express.Router();

joeRouter.get('/dog_treat', (_req, res) => {
  res.send(getDogTreat());
});

export default joeRouter;
