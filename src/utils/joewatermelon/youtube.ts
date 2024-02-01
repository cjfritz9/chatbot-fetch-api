import axios from 'axios';

export const getLatestYtMedia = async () => {
  const response = await axios.get(
    'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC-vjqhlVcyT54gUgzCGO13A&maxResults=1&order=date&type=video&key=AIzaSyD2sRkhratG3GHXwi220t7b47bLEXvO5pc'
  );

  if (
    response &&
    response.data &&
    response.data.items &&
    response.data.items[0]
  ) {
    const media = response.data.items[0];

    const formattedTitle = formatVideoTitle(media.snippet.title);

    return `Check out my latest video! ${formattedTitle} https://www.youtube.com/watch?v=${media.id.videoId}`;
  } else {
    return '[Error fetching latest video]'
  }
};


const formatVideoTitle = (rawTitle: string) => {
  const titleChars = [...rawTitle]
  for (let i = 0; i < titleChars.length; i++) {
    if (titleChars[i] === '#') {
      for (let j = 0; j < titleChars.length; j++) {
        if (titleChars[j] === ' ') {
          titleChars.splice(i, j)
        }
      }
    }
  }

  return titleChars.join('');
}
