import axios from 'axios';
import dotenv from 'dotenv';
import { getBroadcasterId } from '../../lib/broadcasters/tools';
import { API_KEY } from './api';
dotenv.config();

export const getLatestYtMedia = async (username: string) => {
  const genericError = '[Error fetching latest video]';

  try {
    const channelId = getBroadcasterId(username);
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=1&order=date&type=video&key=${API_KEY}`
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
  const formattedTitle = decodeHtml(rawTitle);
  const titleChars = [...formattedTitle];
  const splitChar = '|';

  for (let i = 0; i < titleChars.length; i++) {
    if (titleChars?.[i] === splitChar) {
      for (let j = 0; j < titleChars.length; j++) {
        if (titleChars?.[j] === ' ') {
          titleChars.splice(i, j);
        }
      }
    }
  }

  return titleChars.join('');
};

const decodeHtml = (title: string) => {
  const htmlEntities = [
    { searchVal: 'amp', replacement: '&' },
    { searchVal: 'apos', replacement: "'" },
    { searchVal: 'lt', replacement: '<' },
    { searchVal: 'gt', replacement: '>' },
    { searchVal: 'nbsp', replacement: ' ' },
    { searchVal: 'quot', replacement: '"' },
    { searchVal: 'copy', replacement: '©' },
    { searchVal: 'reg', replacement: '®' },
    { searchVal: '#x27', replacement: "'" },
    { searchVal: '#x2F', replacement: '/' },
    { searchVal: '#39', replacement: "'" },
    { searchVal: '#47', replacement: '/' }
  ];

  for (const item of htmlEntities) {
    const valToHtml = `&${item.searchVal};`;
    if (title.includes(valToHtml)) {
      title = title.replaceAll(valToHtml, item.replacement);
    }
  }

  return title;
};
