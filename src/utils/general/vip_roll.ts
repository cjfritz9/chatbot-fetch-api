import dotenv from 'dotenv';
dotenv.config();

export const getVipRoll = async (username: string) => {
  const genericError = '[Error getting VIP Roll]';

  try {
    const dealerRoll = Math.round(Math.random() * 9) + 1;
    const userRoll = Math.round(Math.random() * 9) + 1;

    if (dealerRoll === userRoll) {
      
      return `${username} WINS VIP! Poooound [ rolled ${userRoll} against ${dealerRoll} ]`;
    } else {
      return `${username} lost 20k x0r6ztGiggle [ rolled ${userRoll} against ${dealerRoll} ]`;
    }
  } catch (error) {
    console.error('Caught Error: ', error);
    return genericError;
  }
};
