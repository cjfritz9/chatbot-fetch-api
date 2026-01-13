import axios from 'axios';

const TWITCH_API_BASE = 'https://api.twitch.tv/helix';

interface TwitchTokens {
  accessToken: string;
  refreshToken: string;
  clientId: string;
  clientSecret: string;
}

function getTokens(): TwitchTokens {
  return {
    accessToken: process.env.ACCESS_TOKEN || '',
    refreshToken: process.env.REFRESH_TOKEN || '',
    clientId: process.env.CLIENT_ID || '',
    clientSecret: process.env.CLIENT_SECRET || '',
  };
}

async function refreshAccessToken(): Promise<string> {
  const { refreshToken, clientId, clientSecret } = getTokens();

  const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
    params: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
    },
  });

  // Note: In production, you'd want to persist the new tokens
  console.log('Refreshed Twitch access token');
  return response.data.access_token;
}

export async function sendChatMessage(
  broadcasterId: string,
  message: string
): Promise<boolean> {
  const { accessToken, clientId } = getTokens();
  const senderId = process.env.USER_ID || broadcasterId;

  try {
    await axios.post(
      `${TWITCH_API_BASE}/chat/messages`,
      {
        broadcaster_id: broadcasterId,
        sender_id: senderId,
        message: message,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Client-Id': clientId,
          'Content-Type': 'application/json',
        },
      }
    );
    return true;
  } catch (error: any) {
    // If token expired, try refreshing
    if (error.response?.status === 401) {
      console.log('Access token expired, refreshing...');
      try {
        const newToken = await refreshAccessToken();
        await axios.post(
          `${TWITCH_API_BASE}/chat/messages`,
          {
            broadcaster_id: broadcasterId,
            sender_id: senderId,
            message: message,
          },
          {
            headers: {
              Authorization: `Bearer ${newToken}`,
              'Client-Id': clientId,
              'Content-Type': 'application/json',
            },
          }
        );
        return true;
      } catch (refreshError) {
        console.error('Failed to send message after token refresh:', refreshError);
        return false;
      }
    }
    console.error('Failed to send Twitch chat message:', error.response?.data || error.message);
    return false;
  }
}
