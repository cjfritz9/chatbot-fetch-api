import express from 'express';
import * as RAIDS from '../utils/osrs/raids';
import * as OSRS from '../utils/osrs/helpers';
import { createUser, getUser, updateUser } from '../db/osrs';

const osrsRouter = express.Router();

// TODO: ADD USERNAME SUPPORT TO TRACK TOTAL
// TODO: ADD RAID PARTY SUPPORT (!join command?)
// TODO: IMPLEMENT RNG BUFF STANDALONE

osrsRouter.get('/raids/cox', async (req: any, res: any) => {
  try {
    const {
      username,
      rngBuff
    }: { username: string | undefined; rngBuff: string | undefined } =
      req.query;
    if (!username) {
      return res.send('Error - No username was supplied');
    }
    const loot = RAIDS.raidCox(rngBuff ? +rngBuff : 0);
    console.log(loot);
    let user = await getUser(username);
    console.log('user response, expect undefined', user);
    if (!user) {
      user = await createUser(username, '0', JSON.stringify(loot.dbEntry));
    }
    console.log('user creation + response, expect user data', user);

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

osrsRouter.get('/raids/cox_buff', async (_req: any, _res: any) => {
  // const { rngBonus, username } = req.query;
  // if (+rngBonus) {
  //   const loot = RAIDS.getCoxPurple(+rngBonus);
  //   const [response, user] = await Promise.all([
  //     axios.get(`${OSRS_API}?id=${loot.itemId}`, {
  //       headers
  //     }),
  //     getUser(username)
  //   ]);
  //   if (response?.data?.data) {
  //     const itemPrices = response.data.data[loot.itemId];
  //     const price = OSRS.getMedianPrice(itemPrices.low, itemPrices.high);
  //     const totalWealth = (+price + +user.gp).toString();
  //     const formattedPrice = OSRS.formatGP(price);
  //     const formattedWealth = OSRS.formatGP(totalWealth);
  //     loot.dbEntry.price = price;
  //     updateUser(username, totalWealth, JSON.stringify(loot.dbEntry));
  //     res.send(
  //       `${username} successfully completed the Chambers of Xeric and received ${loot.itemName} worth ${formattedPrice}! Total wealth: ${formattedWealth}`
  //     );
  //   } else {
  //     console.log('-----OSRS WIKI API ERROR-----');
  //     console.log('-----FULL RESPONSE BELOW-----');
  //     console.log(response);
  //     res.send({ error: 'Server Error - Contact wandernaut#2205' });
  //   }
  // } else {
  //   console.log('-----URL QUERY ENCODING ERROR-----');
  //   console.log('rngBonus: ', rngBonus);
  //   console.log('username: ', username);
  //   res.send({ error: 'Server Error - Contact wandernaut#2205' });
  // }
});

osrsRouter.get('/raids/tob_buff', async (req: any, res: any) => {
  const { rngBonus, username } = req.query;
  res.send(RAIDS.getTobPurple(rngBonus));
});

osrsRouter.get('/raids/toa_buff', async (req: any, res: any) => {
  const { rngBonus, username } = req.query;
  res.send(RAIDS.getToaPurple(rngBonus));
});

export default osrsRouter;
