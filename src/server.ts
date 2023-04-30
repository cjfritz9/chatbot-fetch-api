import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();
export const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('*', (req) => {
  console.log('-----REQUEST LOGGER-----');
  console.log('request URL: ', req.originalUrl);
  console.log('request queries: ', { ...req.query });
  console.log('request body: ', req.body);
  console.log('-----END LOGGER-----');
});

import huntShowdownRouter from './routes/hunt-showdown';
app.use('/hunt_showdown', huntShowdownRouter);

import osrsRouter from './routes/osrs';
app.use('/osrs', osrsRouter);

import joeRouter from './routes/joewatermelon';
import { fetchAndAddPrices } from './utils/osrs/helpers';
import { raidCox } from './utils/osrs/raids';
app.use('/joewatermelon', joeRouter);

app.get('/testing', async (_req, _res) => {
  const { username, rngBuff } = _req.query;
  const loot = raidCox();
  if (loot.beam === 'purple') {
    _res.send(
      `${username} enters the Chambers of Xeric. They complete the raid with ${loot.points.toFixed(
        0
      )} points. They see a joewatLOOT PURPLE joewatLOOT loot beam! Within the chest they find ${
        loot.itemName
      }!`
    );
  } else {
    _res.send(
      `${username} enters the Chambers of Xeric. They complete the raid with ${loot.points.toFixed(
        0
      )} points${
        loot.didPlank ? ' (what a planker x0r6ztGiggle)' : ''
      }. They see a white loot beam. Within the chest they find ${
        loot.itemName
      }. Never lucky Sadge`
    );
  }
});

app.get('/*', (req, res) => {
  console.log('request url: ', req.url);
  console.log('request user query: ', req.query.user);
  res.status(404).send('The page you are looking for does not exist.');
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
