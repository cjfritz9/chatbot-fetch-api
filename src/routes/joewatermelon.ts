import express from 'express';
import dotenv from 'dotenv';
import getDogTreat from '../utils/joewatermelon';

dotenv.config();
const joeRouter = express.Router();

joeRouter.get('/dog_treat', async (_req, res) => {
  res.send(getDogTreat());
});

export default joeRouter;
