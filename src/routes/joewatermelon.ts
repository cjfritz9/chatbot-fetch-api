import express from 'express';
import dotenv from 'dotenv';
import getDogTreat, { TESTING_getDogTreat } from '../utils/joewatermelon/index';

dotenv.config();
const joeRouter = express.Router();

joeRouter.get('/dog_treat', async (_req, res) => {
  res.send(getDogTreat());
});

joeRouter.get('/dog_treat/testing', async (_req, res) => {
  res.send(TESTING_getDogTreat());
});

export default joeRouter;
