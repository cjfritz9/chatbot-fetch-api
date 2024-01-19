import axios from 'axios';

export const getLatestYtMedia = async () => {
  const response = await axios.get(
    'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC-vjqhlVcyT54gUgzCGO13A&maxResults=1&order=date&type=video&key=AIzaSyD2sRkhratG3GHXwi220t7b47bLEXvO5pc'
  );

  const media = response.data.items[0];

  return `Check out my latest video! ${media.snippet.title} https://www.youtube.com/watch?v=${media.id.videoId}`;
};
