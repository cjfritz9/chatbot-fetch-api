import dotenv from 'dotenv';
import { addVipWinner } from '../../db/general';
dotenv.config();

export const getVipRoll = async (channelName: string, username: string) => {
  const genericError = '[Error getting VIP Roll]';

  try {
    const dealerRoll = Math.round(Math.random() * 9) + 1;
    const userRoll = Math.round(Math.random() * 9) + 1;

    if (dealerRoll === userRoll) {
      addVipWinner(channelName, username);
      return `${username} WINS VIP! Poooound [ rolled ${userRoll} against ${dealerRoll} ]`;
    } else {
      return `${username} lost 20k x0r6ztGiggle [ rolled ${userRoll} against ${dealerRoll} ]`;
    }
  } catch (error) {
    console.error('Caught Error: ', error);
    return genericError;
  }
};
