import broadcastersMap from './broadcasters.json';

export const getBroadcasterId = (username: string) => {
  try {
    const channelId =
      broadcastersMap?.[username.toLowerCase() as keyof typeof broadcastersMap];

    if (!channelId) {
      return null;
    }

    return channelId;
  } catch (error) {
    console.error('getBroadcasterId()', error);
    return null;
  }
};
