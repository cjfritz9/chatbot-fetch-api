import express from 'express';
import * as OSRS from '../utils/raids-loot';
import axios from 'axios';
import { getUser, updateUser } from '../db/osrs';

const OSRS_API = 'https://prices.runescape.wiki/api/v1/osrs/latest';
const headers = { 'User-Agent': 'chatbot_raid_sim - @wandernaut#2205' };

const osrsRouter = express.Router();

// TODO: ADD USERNAME SUPPORT TO TRACK TOTAL
// TODO: ADD RAID PARTY SUPPORT (!join command?)

osrsRouter.get('/:username/raids/cox', async (req: any, res: any) => {
  const { username } = req.params;
  console.log(username);
  const loot = OSRS.getCoxPurple();
  const [response, user] = await Promise.all([
    axios.get(`${OSRS_API}?id=${loot.itemId}`, {
      headers
    }),
    getUser(username)
  ]);
  if (response?.data?.data) {
    const itemPrices = response.data.data[loot.itemId];
    const price = OSRS.getMedianPrice(itemPrices.low, itemPrices.high);
    const totalWealth = (+price + +user.gp).toString();
    const formattedPrice = OSRS.formatGP(price);
    const formattedWealth = OSRS.formatGP(totalWealth);
    loot.dbEntry.price = price;
    updateUser(username, totalWealth, JSON.stringify(loot.dbEntry));

    res.send(
      `${username} successfully completed the Chambers of Xeric and received ${loot.itemName} worth ${formattedPrice}! Total wealth: ${formattedWealth}`
    );
  } else {
    res.send('Server Error - Contact wandernaut#2205');
  }
});

osrsRouter.get('/:username/raids/tob', async (_req: any, res: any) => {
  res.send(OSRS.getTobPurple());
});

osrsRouter.get('/:username/raids/toa', async (_req: any, res: any) => {
  res.send(OSRS.getToaPurple());
});

osrsRouter.get('/:username/raids/cox_buff', async (_req: any, res: any) => {
  res.send(OSRS.getCoxPurple(true));
});

osrsRouter.get('/:username/raids/tob_buff', async (_req: any, res: any) => {
  res.send(OSRS.getTobPurple(true));
});

osrsRouter.get('/:username/raids/toa_buff', async (_req: any, res: any) => {
  res.send(OSRS.getToaPurple(true));
});

export default osrsRouter;
