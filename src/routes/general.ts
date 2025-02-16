import express from 'express';
import { getLatestYtMedia } from '../utils/general/latest_yt_media';
import { ApiResponse } from '../lib/classes/ApiResponse';

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

export default generalRouter;
