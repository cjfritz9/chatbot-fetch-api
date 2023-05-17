import express from 'express';
import dotenv from 'dotenv';
import getDogTreat from '../utils/joewatermelon/dog-treat';
import getRandomGP from '../utils/joewatermelon/gp-reward';
import { addGpRewardEntry } from '../db/joewatermelon';

dotenv.config();
const joeRouter = express.Router();

joeRouter.get('/dog_treat', async (_req, res) => {
  res.send(await getDogTreat());
});

joeRouter.get('/gp_reward', async (req, res) => {
  const { username } = req.query as { username: string };
  const { reward, message } = getRandomGP(username);
  addGpRewardEntry(username, reward);
  res.send(message);
});

export default joeRouter;
