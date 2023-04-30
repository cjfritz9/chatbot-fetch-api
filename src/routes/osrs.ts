import express from 'express';
import * as Raids from '../utils/raids-loot';
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
  const loot = Raids.getCoxPurple(true);
  const [response, user] = await Promise.all([
    axios.get(`${OSRS_API}?id=${loot.itemId}`, {
      headers
    }),
    getUser(username)
  ]);
  if (response?.data?.data) {
    const high = response.data.data[loot.itemId].high;
    const low = response.data.data[loot.itemId].low;
    const diff = high - low;
    const price = Math.round(low + diff / 2).toString();
    const totalWealth = (+price + +user.gp).toString();
    let formattedPrice: string;
    let formattedWealth: string;
    console.log(price);
    if (price.length > 9) {
      formattedPrice =
        price.slice(0, price.length - 9) + '.' + price.charAt(1) + 'B';
      formattedWealth =
        price.slice(0, price.length - 9) + '.' + price.charAt(1) + 'B';
    }
    if (price.length < 10 && price.length > 6) {
      formattedPrice = price.slice(0, price.length - 6) + 'M';
      formattedWealth = price.slice(0, price.length - 6) + 'M';
    }
    updateUser(username, totalWealth);
    res.send(
      `${username} successfully completed the Chambers of Xeric and received ${
        loot.message
      } worth ${formattedPrice!}. Total wealth: ${formattedWealth!}`
    );
  } else {
    res.send('Server Error: Contact wandernaut#2205');
  }
});

osrsRouter.get('/:username/raids/tob', async (_req: any, res: any) => {
  res.send(Raids.getTobPurple());
});

osrsRouter.get('/:username/raids/toa', async (_req: any, res: any) => {
  res.send(Raids.getToaPurple());
});

osrsRouter.get('/:username/raids/cox_buff', async (_req: any, res: any) => {
  res.send(Raids.getCoxPurple(true));
});

osrsRouter.get('/:username/raids/tob_buff', async (_req: any, res: any) => {
  res.send(Raids.getTobPurple(true));
});

osrsRouter.get('/:username/raids/toa_buff', async (_req: any, res: any) => {
  res.send(Raids.getToaPurple(true));
});

export default osrsRouter;
