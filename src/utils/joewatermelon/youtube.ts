import axios from 'axios';

export const getLatestYtMedia = async () => {
  const genericError = { error: '[Error fetching latest video]' };

  try {
    const response = await axios.get(
      'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC-vjqhlVcyT54gUgzCGO13A&maxResults=1&order=date&type=video&key=AIzaSyD2sRkhratG3GHXwi220t7b47bLEXvO5pc'
    );

    if (response?.data?.items?.[0]) {
      const media = response?.data?.items?.[0];
      const title = media?.snippet?.title;
      const videoId = media?.id?.videoId;

      if (!title || !videoId) {
        return genericError;
      }
      const formattedTitle = formatVideoTitle(title);

      return `Check out my latest video! ${formattedTitle} https://www.youtube.com/watch?v=${videoId}`;
    } else {
      return genericError;
    }
  } catch (error) {
    console.error('Caught Error: ', error);
    return genericError;
  }
};

const formatVideoTitle = (rawTitle: string) => {
  const splitChar = '|';
  const titleChars = [...rawTitle];

  for (let i = 0; i < titleChars.length; i++) {
    if (titleChars?.[i] === splitChar) {
      for (let j = 0; j < titleChars.length; j++) {
        if (titleChars?.[j] === ' ') {
          titleChars.splice(i + 1, j);
        }
      }
    }
  }

  return titleChars.join('');
};
