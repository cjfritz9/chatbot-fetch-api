import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import { PubSubClient } from '@twurple/pubsub/lib';
import { RefreshingAuthProvider } from '@twurple/auth/lib';

const userId = process.env.USER_ID!;
const clientId = process.env.CLIENT_ID!;
const clientSecret = process.env.CLIENT_SECRET!;
const authProvider = new RefreshingAuthProvider({
  clientId,
  clientSecret,
  onRefresh: async (userId, newTokenData) =>
    await fs.writeFile(
      `./db/tokens.${userId}.json`,
      JSON.stringify(newTokenData, null, 4),
      'utf-8'
    )
});

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors({ origin: '*' }));

import huntShowdownRouter from './routes/hunt_showdown';
app.use('/hunt_showdown', huntShowdownRouter);

import osrsRouter from './routes/osrs';
app.use('/osrs', osrsRouter);

import joeRouter from './routes/joewatermelon';
app.use('/joewatermelon', joeRouter);

app.listen(PORT, () => {
  const pubSubClient = new PubSubClient({ authProvider });
  const handler = pubSubClient.onRedemption(userId, (message) => {
    console.log(`${message.rewardTitle} was just redeemed!`);
  });
  console.log(`Server running on port: ${PORT}`);
});

export default app;
