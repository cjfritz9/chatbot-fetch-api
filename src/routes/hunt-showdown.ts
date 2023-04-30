import express from 'express';
import getRandomLoadout from '../utils/hunt-showdown/random-loadout';

const huntShowdownRouter = express.Router();

huntShowdownRouter.get('/random_loadout', async (_req: any, res: any) => {
  res.send(getRandomLoadout());
});

export default huntShowdownRouter;
