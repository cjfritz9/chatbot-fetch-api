import express from 'express';
import * as Raids from '../utils/osrs/raids-loot';

const osrsRouter = express.Router();

osrsRouter.get('/osrs/raids/cox', async (_req: any, res: any) => {
  res.send(Raids.getCoxPurple());
});

osrsRouter.get('/osrs/raids/tob', async (_req: any, res: any) => {
  res.send(Raids.getTobPurple());
});

osrsRouter.get('/osrs/raids/toa', async (_req: any, res: any) => {
  res.send(Raids.getToaPurple());
});


export default osrsRouter;