import express from 'express';
import dotenv from 'dotenv';
import getDogTreat from '../utils/joewatermelon/dog-treat';
import getRandomGP from '../utils/joewatermelon/gp-reward';
import { addGpRewardEntry } from '../db/joewatermelon';
import { getLatestYtMedia } from '../utils/joewatermelon/youtube';

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

joeRouter.get('/latest_yt_media', async (_req, res) => {
  res.send(await getLatestYtMedia());
});

export default joeRouter;
