import crypto from 'crypto';
import express from 'express';
import { sendChatMessage } from '../utils/twitch/api';
import { addVipWinner } from '../db/general';

const twitchEventSubRouter = express.Router();

const TWITCH_MESSAGE_SIGNATURE = 'twitch-eventsub-message-signature';
const TWITCH_MESSAGE_ID = 'twitch-eventsub-message-id';
const TWITCH_MESSAGE_TIMESTAMP = 'twitch-eventsub-message-timestamp';
const TWITCH_MESSAGE_TYPE = 'twitch-eventsub-message-type';

const MESSAGE_TYPE_VERIFICATION = 'webhook_callback_verification';
const MESSAGE_TYPE_NOTIFICATION = 'notification';
const MESSAGE_TYPE_REVOCATION = 'revocation';

function getHmacMessage(
  messageId: string,
  timestamp: string,
  body: string
): string {
  return messageId + timestamp + body;
}

function getHmac(secret: string, message: string): string {
  return 'sha256=' + crypto.createHmac('sha256', secret).update(message).digest('hex');
}

function verifyMessage(expectedHmac: string, providedHmac: string): boolean {
  const expected = Buffer.from(expectedHmac);
  const provided = Buffer.from(providedHmac);
  if (expected.length !== provided.length) {
    return false;
  }
  return crypto.timingSafeEqual(
    new Uint8Array(expected),
    new Uint8Array(provided)
  );
}

// Raw body middleware for signature verification
twitchEventSubRouter.use(
  express.raw({ type: 'application/json' })
);

twitchEventSubRouter.post('/webhook', (req: any, res: any) => {
  const secret = process.env.TWITCH_WEBHOOK_SECRET;

  if (!secret) {
    console.error('TWITCH_WEBHOOK_SECRET not configured');
    return res.status(500).send('Server configuration error');
  }

  const signature = req.headers[TWITCH_MESSAGE_SIGNATURE] as string;
  const messageId = req.headers[TWITCH_MESSAGE_ID] as string;
  const timestamp = req.headers[TWITCH_MESSAGE_TIMESTAMP] as string;
  const messageType = req.headers[TWITCH_MESSAGE_TYPE] as string;

  // Convert raw body buffer to string for HMAC and parsing
  const rawBody = req.body.toString('utf8');
  const hmacMessage = getHmacMessage(messageId, timestamp, rawBody);
  const expectedHmac = getHmac(secret, hmacMessage);

  if (!verifyMessage(expectedHmac, signature)) {
    console.error('Invalid signature');
    return res.status(403).send('Invalid signature');
  }

  const body = JSON.parse(rawBody);

  // Handle different message types
  if (messageType === MESSAGE_TYPE_VERIFICATION) {
    console.log('Received verification challenge');
    return res.status(200).send(body.challenge);
  }

  if (messageType === MESSAGE_TYPE_REVOCATION) {
    console.log('Subscription revoked:', body.subscription);
    return res.status(204).send();
  }

  if (messageType === MESSAGE_TYPE_NOTIFICATION) {
    const event = body.event;
    const subscriptionType = body.subscription?.type;

    console.log('Received event:', subscriptionType);
    console.log('Event data:', JSON.stringify(event, null, 2));

    // Handle channel point redemption
    if (subscriptionType === 'channel.channel_points_custom_reward_redemption.add') {
      handleChannelPointRedemption(event);
    }

    return res.status(204).send();
  }

  res.status(204).send();
});

// VIP Roll reward name - update this to match your channel point reward
const VIP_ROLL_REWARD_NAME = 'VIP Roll';

async function handleChannelPointRedemption(event: any) {
  const {
    user_name,
    user_input,
    reward,
    broadcaster_user_id,
    broadcaster_user_login,
  } = event;

  console.log('=== Channel Point Redemption ===');
  console.log('User:', user_name);
  console.log('Reward:', reward?.title);
  console.log('User Input:', user_input);
  console.log('Broadcaster:', broadcaster_user_login);
  console.log('================================');

  // Handle VIP Roll redemption
  if (reward?.title === VIP_ROLL_REWARD_NAME) {
    await handleVipRoll(broadcaster_user_id, broadcaster_user_login, user_name, user_input);
  }
}

async function handleVipRoll(
  broadcasterId: string,
  channelName: string,
  username: string,
  userInput: string
) {
  try {
    // Parse user's guess (expecting a number 1-10)
    const userGuess = parseInt(userInput?.trim(), 10);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
      await sendChatMessage(
        broadcasterId,
        `@${username} Invalid guess! Please enter a number between 1 and 10.`
      );
      return;
    }

    // Generate dealer's roll
    const dealerRoll = Math.floor(Math.random() * 10) + 1;

    if (userGuess === dealerRoll) {
      await addVipWinner(channelName, username);
      await sendChatMessage(
        broadcasterId,
        `${username} WINS VIP! Poooound !!!!! [ guessed ${userGuess} against ${dealerRoll} ]`
      );
    } else {
      await sendChatMessage(
        broadcasterId,
        `${username} lost 20k x0r6ztGiggle !! [ guessed ${userGuess} against ${dealerRoll} ]`
      );
    }
  } catch (error) {
    console.error('Error handling VIP roll:', error);
    await sendChatMessage(
      broadcasterId,
      `@${username} Something went wrong with the VIP roll. Please try again!`
    );
  }
}

export default twitchEventSubRouter;
