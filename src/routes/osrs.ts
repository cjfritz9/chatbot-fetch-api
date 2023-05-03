import express from 'express';
import * as RAIDS from '../utils/osrs/raids';
import * as OSRS from '../utils/osrs/helpers';
import { addNewFields, createUser, getUser, updateUser } from '../db/osrs';

const osrsRouter = express.Router();

// TODO: ADD USERNAME SUPPORT TO TRACK TOTAL
// TODO: ADD RAID PARTY SUPPORT (!join command?)
// TODO: IMPLEMENT RNG BUFF STANDALONE

osrsRouter.get('/raids/cox', async (req: any, res: any) => {
  try {
    const {
      username
    }: { username: string | undefined; rngBuff: string | undefined } =
      req.query;
    if (!username) {
      return res.send('Error - No username was supplied');
    }
    let user = await getUser(username);
    if (!user) {
      user = { username: 'username', gp: '0', rngBuff: 0 };
    }
    console.log('user creation + response, expect user data', user);

    const loot = RAIDS.raidCox(user.rngBuff);
    console.log(loot);
    console.log('user response, expect undefined', user);
    loot.dbEntry.price = await OSRS.fetchAndAddPrices(loot.itemInfo);
    const totalWealth = (+user.gp + +loot.dbEntry.price).toString();
    const formattedPrice = OSRS.formatGP(loot.dbEntry.price);
    const formattedWealth = OSRS.formatGP(totalWealth);
    updateUser(username, totalWealth, JSON.stringify(loot.dbEntry));

    if (loot.beam === 'purple') {
      res.send(
        `${username} enters the Chambers of Xeric. They complete the raid with ${(+loot.points.toFixed(
          0
        )).toLocaleString(
          'en-US'
        )} points. They see a joewatLOOT PURPLE joewatLOOT loot beam! Within the chest they find ${
          loot.itemName
        } worth ${formattedPrice}! Their total wealth is now: ${formattedWealth}`
      );
    } else {
      res.send(
        `${username} enters the Chambers of Xeric. They complete the raid with ${(+loot.points.toFixed(
          0
        )).toLocaleString('en-US')} points${
          loot.didPlank ? ' ( what a planker x0r6ztGiggle )' : ''
        }. They see a white loot beam. Never lucky Sadge . Within the chest they find ${
          loot.itemName
        } worth ${formattedPrice}. Their total wealth is now: ${formattedWealth}.`
      );
    }
  } catch (error) {
    res.send('Error - contact wandernaut#2205');
    console.error('Caught error: ', error);
  }
});

osrsRouter.get('/raids/tob', async (_req: any, res: any) => {
  res.send(RAIDS.getTobPurple());
});

osrsRouter.get('/raids/toa', async (_req: any, res: any) => {
  res.send(RAIDS.getToaPurple());
});

osrsRouter.get('/rngbuff', async (_req: any, _res: any) => {});

osrsRouter.get('/raids/tob_buff', async (req: any, res: any) => {
  const { rngBonus, username } = req.query;
  res.send(RAIDS.getTobPurple(rngBonus));
});

osrsRouter.get('/raids/toa_buff', async (req: any, res: any) => {
  const { rngBonus, username } = req.query;
  res.send(RAIDS.getToaPurple(rngBonus));
});

osrsRouter.get('/addrngfield', async (_req: any, res: any) => {
  addNewFields();
  res.send('added rng fields');
});

export default osrsRouter;
