import express from 'express';
import { addRng, getUser, updateUser } from '../db/osrs';
import * as OSRS from '../utils/osrs/helpers';
import { getItemPriceByAlpha } from '../utils/osrs/price-checker';
import * as RAIDS from '../utils/osrs/raids';

const osrsRouter = express.Router();

// TODO: ADD RAID PARTY SUPPORT (!join command?)
// TODO: ADD TERTIARY LOOT/PETS

osrsRouter.get('/raids/cox', async (req: any, res: any) => {
  try {
    const { username, rngEvent } = req.query;
    if (!username) {
      return res.send('Error - No username was supplied');
    }
    let user = await getUser(username);
    if (!user) {
      user = { username: username, gp: '0', rngBuff: 0 };
    }

    if (rngEvent === 'true') user.rngBuff = 2;

    const loot = RAIDS.raidCox(user.rngBuff);
    loot.dbEntry.price = await OSRS.fetchAndAddPrices(loot.itemInfo);
    const totalWealth = (+user.gp + +loot.dbEntry.price).toString();
    const formattedPrice = OSRS.formatGP(loot.dbEntry.price);
    const formattedWealth = OSRS.formatGP(totalWealth);
    const formattedPoints = (+loot.points.toFixed(0)).toLocaleString('en-US');
    updateUser(username, totalWealth, JSON.stringify(loot.dbEntry));

    const params: RAIDS.ChatStringParams = {
      raid: RAIDS.RaidTypes.COX,
      username,
      isPurple: loot.beam === 'purple',
      lootString: loot.itemName,
      lootValue: formattedPrice,
      totalWealth: formattedWealth,
      points: formattedPoints,
      deaths: loot.didPlank ? '1' : '0'
    };

    res.send(RAIDS.getChatString(params));
  } catch (error) {
    console.error('Caught error: ', error);
    res.send('[Error]');
  }
});

osrsRouter.get('/raids/tob', async (req: any, res: any) => {
  try {
    const { username, rngEvent } = req.query;
    if (!username) {
      return res.send('Error - No username was supplied');
    }
    let user = await getUser(username);
    if (!user) {
      user = { username: username, gp: '0', rngBuff: 0 };
    }

    if (rngEvent === 'true') user.rngBuff = 2;

    const loot = RAIDS.raidTob(user.rngBuff);
    const isPurple = loot.chestColor === 'purple';
    loot.dbEntry.price = await OSRS.fetchAndAddPrices(loot.itemInfo);
    const value = isPurple
      ? +'0' + +loot.dbEntry.price / 3
      : +'0' + +loot.dbEntry.price;
    const formattedValue = OSRS.formatGP(value.toFixed(0));
    const totalWealth = (
      isPurple ? (+user.gp + value).toFixed(0) : +user.gp + value
    ).toString();
    const formattedWealth = OSRS.formatGP(totalWealth);
    updateUser(username, totalWealth, JSON.stringify(loot.dbEntry));

    const params: RAIDS.ChatStringParams = {
      raid: RAIDS.RaidTypes.TOB,
      username,
      isPurple,
      lootString: loot.itemName,
      lootValue: `${formattedValue}${isPurple ? ' (split)' : ''}`,
      totalWealth: formattedWealth,
      deaths: loot.deaths.toString()
    };

    res.send(RAIDS.getChatString(params));
  } catch (error) {
    console.error('Caught error: ', error);
    res.send('[Error]');
  }
});

osrsRouter.get('/raids/toa', async (req: any, res: any) => {
  try {
    const { username, rngEvent } = req.query;
    if (!username) {
      return res.send('Error - No username was supplied');
    }
    let user = await getUser(username);
    if (!user) {
      user = { username: username, gp: '0', rngBuff: 0 };
    }

    if (rngEvent === 'true') user.rngBuff = 2;

    const loot = RAIDS.raidToa(user.rngBuff);
    loot.dbEntry.price = await OSRS.fetchAndAddPrices(loot.itemInfo);
    const totalWealth = (+user.gp + +loot.dbEntry.price).toString();
    const formattedPrice = OSRS.formatGP(loot.dbEntry.price);
    const formattedWealth = OSRS.formatGP(totalWealth);
    updateUser(username, totalWealth, JSON.stringify(loot.dbEntry));

    const params: RAIDS.ChatStringParams = {
      raid: RAIDS.RaidTypes.TOA,
      username,
      isPurple: loot.chestColor === 'purple',
      lootString: loot.itemName,
      lootValue: `${formattedPrice}`,
      totalWealth: formattedWealth
    };

    res.send(RAIDS.getChatString(params));
  } catch (error) {
    console.error('Caught error: ', error);
    res.send('[Error]');
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

export default osrsRouter;
