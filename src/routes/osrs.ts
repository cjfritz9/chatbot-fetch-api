import express from 'express';
import * as RAIDS from '../utils/osrs/raids';
import * as OSRS from '../utils/osrs/helpers';
import { addRng, getUser, updateUser } from '../db/osrs';
import { getItemPriceByAlpha } from '../utils/osrs/price-checker';

const osrsRouter = express.Router();

// TODO: ADD RAID PARTY SUPPORT (!join command?)
// TODO: ADD TERTIARY LOOT/PETS

osrsRouter.get('/raids/cox', async (req: any, res: any) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res.send('Error - No username was supplied');
    }
    let user = await getUser(username);
    if (!user) {
      user = { username: username, gp: '0', rngBuff: 0 };
    }

    console.log(user)

    const loot = RAIDS.raidCox(user.rngBuff);
    loot.dbEntry.price = await OSRS.fetchAndAddPrices(loot.itemInfo);
    const totalWealth = (+user.gp + +loot.dbEntry.price).toString();
    const formattedPrice = OSRS.formatGP(loot.dbEntry.price);
    const formattedWealth = OSRS.formatGP(totalWealth);
    const formattedPoints = (+loot.points.toFixed(0)).toLocaleString('en-US');
    updateUser(username, totalWealth, JSON.stringify(loot.dbEntry));

    if (loot.beam === 'purple') {
      res.send(
        `${username} enters CoX. They finish with ${formattedPoints} points. They see a peepoPurple chest! Inside they find ${loot.itemName} worth ${formattedPrice}! Total wealth: ${formattedWealth}`
      );
    } else {
      res.send(
        `${username} enters CoX. They finish with ${formattedPoints} points${
          loot.didPlank ? ' ( planker x0r6ztGiggle !)' : ''
        }. They see a peepoWhite chest. Inside they find ${
          loot.itemName
        } worth ${formattedPrice}. Total wealth: ${formattedWealth}.`
      );
    }
  } catch (error) {
    res.send('Error - contact wandernaut#2205');
    console.error('Caught error: ', error);
  }
});

osrsRouter.get('/raids/tob', async (req: any, res: any) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res.send('Error - No username was supplied');
    }
    let user = await getUser(username);
    if (!user) {
      user = { username: username, gp: '0', rngBuff: 0 };
    }

    const loot = RAIDS.raidTob(user.rngBuff);
    loot.dbEntry.price = await OSRS.fetchAndAddPrices(loot.itemInfo);
    console.log('loot res: ', loot);
    const formattedSplit = OSRS.formatGP(
      (+'0' + +loot.dbEntry.price / 3).toFixed(0)
    );
    const totalWealth = (
      loot.chestColor === 'purple'
        ? (+user.gp + +loot.dbEntry.price / 3).toFixed(0)
        : +user.gp + +loot.dbEntry.price
    ).toString();
    const formattedPrice = OSRS.formatGP(loot.dbEntry.price);
    const formattedWealth = OSRS.formatGP(totalWealth);
    updateUser(username, totalWealth, JSON.stringify(loot.dbEntry));
    if (loot.horribleRng) {
      res.send(`
          ${username} enters ToB with two 0kc beginners from WDR. The beginners die in every room but ${username} carries the raid to the end GIGACHAD . At the end of the raid they see a peepoPurple chest but it's in a beginner's name. Inside they find: Scythe of vitur (uncharged) ScytheV . They put ${username} on their ignore and hop worlds. x0r6ztGiggle !!
          `);
    } else {
      if (loot.chestColor === 'purple') {
        res.send(`
            ${username} enters ToB with ${
          loot.weDoRaids
            ? 'two people from WDR monkaW .'
            : "two GIGACHAD s from Joewatermelon's clan."
        } They finish the raid with ${loot.deaths} ${
          loot.deaths === 1 ? 'death' : 'deaths'
        }. They see a peepoPurple chest! Within the chest they find ${
          loot.itemName
        } (${formattedPrice} | ~${formattedSplit} split). Total wealth: ${formattedWealth}!
            `);
      } else {
        res.send(`
            ${username} enters ToB with ${
          loot.weDoRaids
            ? 'two people from WDR monkaW .'
            : 'two GIGACHAD s from the Joewatermelon clan.'
        } They finish the raid with ${loot.deaths} ${
          loot.deaths === 1 ? 'death' : 'deaths'
        }. They see a peepoWhite chest. Within their chest they find ${
          loot.itemName
        } (${formattedPrice}). Total wealth ${formattedWealth}!
            `);
      }
    }
  } catch (error) {
    res.send('Error - contact wandernaut#2205');
    console.error('Caught error: ', error);
  }
});

osrsRouter.get('/raids/toa', async (req: any, res: any) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res.send('Error - No username was supplied');
    }
    let user = await getUser(username);
    if (!user) {
      user = { username: username, gp: '0', rngBuff: 0 };
    }

    const loot = RAIDS.raidToa(user.rngBuff);
    loot.dbEntry.price = await OSRS.fetchAndAddPrices(loot.itemInfo);
    console.log('loot res: ', loot);
    const totalWealth = (+user.gp + +loot.dbEntry.price).toString();
    const formattedPrice = OSRS.formatGP(loot.dbEntry.price);
    const formattedWealth = OSRS.formatGP(totalWealth);
    updateUser(username, totalWealth, JSON.stringify(loot.dbEntry));
    if (loot.chestColor === 'purple') {
      res.send(`
      ${username} completes a level ${loot.raidLevel} ToA. They see a peepoPurple chest! Inside they find ${loot.itemName} (${formattedPrice}). Total wealth ${formattedWealth}!
      `);
    } else {
      res.send(`
      ${username} completes a level ${loot.raidLevel} ToA. They see a peepoWhite chest. Inside they find ${loot.itemName} (${formattedPrice}). Total wealth ${formattedWealth}!
      `);
    }
  } catch (error) {
    res.send('Error - contact wandernaut#2205');
    console.error('Caught error: ', error);
  }
});

osrsRouter.get('/rngbuff', async (req: any, res: any) => {
  const { username } = req.query;
  const response = await addRng(username);
  if (response.error) {
    res.send(response.error);
  } else {
    res.send(response.success);
  }
});

osrsRouter.get('/price-checker', async (req: any, res: any) => {
  const { alpha } = req.query;

  if (!alpha) {
    res.send('Try !pc [item name]');
  }

  const response = await getItemPriceByAlpha(alpha);

  res.send(response);
});

// osrsRouter.get('/raids/tob_buff', async (req: any, res: any) => {
//   const { rngBonus, username } = req.query;
//   res.send(RAIDS.getTobPurple(rngBonus));
// });

// osrsRouter.get('/raids/toa_buff', async (req: any, res: any) => {
//   const { rngBonus, username } = req.query;
//   res.send(RAIDS.getToaPurple(rngBonus));
// });

export default osrsRouter;
