import express from 'express';
import * as Raids from '../utils/raids-loot';

const osrsRouter = express.Router();

osrsRouter.get('/raids/cox', async (_req: any, res: any) => {
  res.send(Raids.getCoxPurple());
});

osrsRouter.get('/raids/tob', async (_req: any, res: any) => {
  res.send(Raids.getTobPurple());
});

osrsRouter.get('/raids/toa', async (_req: any, res: any) => {
  res.send(Raids.getToaPurple());
});


export default osrsRouter;