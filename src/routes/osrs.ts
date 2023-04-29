import express from 'express';
import * as Raids from '../utils/raids-loot';

const osrsRouter = express.Router();

// TODO: ADD USERNAME SUPPORT TO TRACK TOTAL WEALTH

osrsRouter.get('/raids/cox', async (_req: any, res: any) => {
  res.send(Raids.getCoxPurple());
});

osrsRouter.get('/raids/tob', async (_req: any, res: any) => {
  res.send(Raids.getTobPurple());
});

osrsRouter.get('/raids/toa', async (_req: any, res: any) => {
  res.send(Raids.getToaPurple());
});

osrsRouter.get('/raids/cox_buff', async (_req: any, res: any) => {
  res.send(Raids.getCoxPurple(true));
});


osrsRouter.get('/raids/tob_buff', async (_req: any, res: any) => {
  res.send(Raids.getTobPurple(true));
});

osrsRouter.get('/raids/toa_buff', async (_req: any, res: any) => {
  res.send(Raids.getToaPurple(true));
});


export default osrsRouter;
