import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import getDogTreat from '../utils/joewatermelon';
import { PubSubClient } from '@twurple/pubsub';
import { RefreshingAuthProvider } from '@twurple/auth';
import { promises as fs } from 'fs';

dotenv.config();
const joeRouter = express.Router();

const clientId = process.env.CLIENT_ID!;
const clientSecret = process.env.CLIENT_SECRET!;
const accessToken = process.env.ACCESS_TOKEN!;
const refreshToken = process.env.REFRESH_TOKEN!;
const tokenData = {
  accessToken,
  refreshToken,
  expiresIn: 0,
  obtainmentTimestamp: 0
};

joeRouter.get('/auth', async (req, res) => {
  const code = req.url.slice(req.url.indexOf('=') + 1, req.url.indexOf('&'));
  const code2 = req.query.code;
  console.log('--code: ', code);
  console.log('--code2: ', code2);
  const response = await axios.post(
    'https://id.twitch.tv/oauth2/token',
    `client_id=1xkvdpm0d3i7kkfsvcglm29dvv71g4&client_secret=cme6w5kqh6b0bzvm7ag45ypfdxoibl&code=${code}&grant_type=authorization_code&redirect_uri=https://nightbot-fetch-api-l75xpo5a3a-uc.a.run.app/joewatermelon/auth`
  );
  if (response && response.data) {
    console.log('--user token data: ', response.data);
    res.send('Success. Get hacked Joe!');
  } else {
    res.send('Failed');
  }
});

joeRouter.get('/dog_treat', async (_req, res) => {
  const authProvider = new RefreshingAuthProvider({
    clientId,
    clientSecret,
    onRefresh: async (userId, newTokenData) =>
      await fs.writeFile(
        `./tokens.${userId}.json`,
        JSON.stringify(newTokenData, null, 4),
        'utf-8'
      )
  });
  if (!authProvider) {
    res.send('Failed');
  } else {
    const userId = await authProvider.addUserForToken(tokenData);
    const pubSubClient = new PubSubClient({ authProvider });
    const handler = pubSubClient.onRedemption(userId, (message) => {
      console.log(`${message.rewardTitle} was just redeemed!`);
    });
    console.log(handler);
    res.send('Success: ');
  }
  // res.send(getDogTreat());
});

export default joeRouter;

console.log(
  'https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=1xkvdpm0d3i7kkfsvcglm29dvv71g4&redirect_uri=https://nightbot-fetch-api-l75xpo5a3a-uc.a.run.app/joewatermelon/auth&scope=channel%3Aread%3Aredemptions&state=c3ab8aa609ea11e793ae92361f002671'
);
console.log(
  'client_id=1xkvdpm0d3i7kkfsvcglm29dvv71g4&client_secret=cme6w5kqh6b0bzvm7ag45ypfdxoibl&code=e9au4i5p7wjvagobzu63bkeoy6ah4p&grant_type=authorization_code&redirect_uri=https://nightbot-fetch-api-l75xpo5a3a-uc.a.run.app/joewatermelon/auth'
);
