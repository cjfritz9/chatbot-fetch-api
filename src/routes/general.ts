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
  const { username } = req?.query || {};
  const channelName = req?.headers?.['x-fossabot-channeldisplayname'] || '';
  const customApiToken = req?.headers?.['x-fossabot-customapitoken'];

  let userInput = '';
  if (customApiToken) {
    try {
      const contextRes = await fetch(
        `https://api.fossabot.com/v2/customapi/context/${customApiToken}`
      );
      const context = await contextRes.json();
      userInput = context?.message?.content || '';
      console.log('Fetched Fossabot context', context);
    } catch (e) {
      console.error('Failed to fetch Fossabot context', e);
    }
  }

  console.log('user input', userInput);

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
