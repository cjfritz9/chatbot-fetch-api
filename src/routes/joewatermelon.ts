import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import getDogTreat from '../utils/joewatermelon';
import { PubSubClient } from '@twurple/pubsub';
import { RefreshingAuthProvider } from '@twurple/auth';
import { promises as fs } from 'fs';

dotenv.config();
const joeRouter = express.Router();

const userId = process.env.USER_ID!;
const clientId = process.env.CLIENT_ID!;
const clientSecret = process.env.CLIENT_SECRET!;
// const accessToken = process.env.ACCESS_TOKEN!;
// const refreshToken = process.env.REFRESH_TOKEN!;

joeRouter.get('/auth', async (req, res) => {
  const code = req.query.code;
  const response = await axios.post(
    'https://id.twitch.tv/oauth2/token',
    `client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code&redirect_uri=https://nightbot-fetch-api-l75xpo5a3a-uc.a.run.app/joewatermelon/auth`
  );
  if (response && response.data) {
    console.log('--user token data: ', response.data);
    res.send('Success. Get hacked Joe!');
  } else {
    res.send('Failed');
  }
});

joeRouter.get('/dog_treat', async (_req, res) => {
  // const authProvider = new RefreshingAuthProvider({
  //   clientId,
  //   clientSecret,
  //   onRefresh: async (userId, newTokenData) =>
  //     await fs.writeFile(
  //       `./db/tokens.${userId}.json`,
  //       JSON.stringify(newTokenData, null, 4),
  //       'utf-8'
  //     )
  // });
  // console.log('auth provider has user ID: ', authProvider.hasUser(userId));
  // if (!authProvider) {
  //   res.send('Failed');
  // } else {
  //   const pubSubClient = new PubSubClient({ authProvider });
  //   const handler = pubSubClient.onRedemption(userId, (message) => {
  //     console.log(`${message.rewardTitle} was just redeemed!`);
  //   });
  //   res.send('Success: ' + handler.topic);
  // }
  res.send(getDogTreat());
});

export default joeRouter;
