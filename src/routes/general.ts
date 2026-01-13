import express from 'express';
import { ApiResponse } from '../lib/classes/ApiResponse';
import { getLatestYtMedia } from '../utils/general/latest_yt_media';
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

generalRouter.get('/vip_roll', async (req: any, res: any) => {
  const { username, querystring } = req?.query || {};
  const channelName = req?.headers?.['x-fossabot-channeldisplayname'] || '';
  console.log('user input', querystring);

  if (!channelName) {
    res.send(
      new ApiResponse(
        'Error - No channel name was supplied',
        'Channel name was not found in headers'
      )
    );
  }

  if (!username) {
    res.send(
      new ApiResponse(
        'Error - No username was supplied',
        'Username was a nullish value'
      )
    );
  }

  res.send(await getVipRoll(channelName, username));
});

export default generalRouter;
