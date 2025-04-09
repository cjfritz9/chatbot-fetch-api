import express from 'express';
import { getLatestYtMedia } from '../utils/general/latest_yt_media';
import { ApiResponse } from '../lib/classes/ApiResponse';
import { getVipRoll } from '../utils/general/vip_roll';

const generalRouter = express.Router();

generalRouter.get(
  '/latest_yt_media/:broadcaster',
  async (req: any, res: any) => {
    const { broadcaster } = req?.params || {};

    if (!broadcaster) {
      res.send(
        new ApiResponse(
          'Broadcaster not provided',
          'No broadcaster param provided'
        )
      );
    }

    res.send(await getLatestYtMedia(broadcaster));
  }
);

generalRouter.get(
  '/vip_roll',
  async (req: any, res: any) => {
    console.log(req)
    const { username } = req?.query || {};

    if (!username) {
      res.send(
        new ApiResponse(
          'Error - No username was supplied',
          'Username was a nullish value'
        )
      );
    }

    res.send(await getVipRoll(username));
  }
);

export default generalRouter;
