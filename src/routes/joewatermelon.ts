import express from 'express';
import dotenv from 'dotenv';
import getDogTreat from '../utils/joewatermelon/dog-treat';

dotenv.config();
const joeRouter = express.Router();

joeRouter.get('/dog_treat', async (_req, res) => {
  res.send(await getDogTreat());
});

export default joeRouter;
