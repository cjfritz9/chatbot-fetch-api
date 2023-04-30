import express from 'express';
import * as Raids from '../utils/raids-loot';

const osrsRouter = express.Router();

// TODO: ADD USERNAME SUPPORT TO TRACK TOTAL

osrsRouter.get('/:username/raids/cox', async (req: any, res: any) => {
  const { username } = req.params;
  console.log(username)
  res.send(Raids.getCoxPurple());
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
