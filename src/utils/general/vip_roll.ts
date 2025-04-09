import dotenv from 'dotenv';
dotenv.config();

export const getVipRoll = async (username: string) => {
  const genericError = '[Error getting VIP Roll]';

  try {
    const roll = Math.round(Math.random() * 9) + 1;

    if (roll === 1) {
      return `${username} rolled a ${roll} and WON vip! Poooound`;
    } else {
      return `${username} rolled a ${roll} and needed a 1... -20k x0r6ztGiggle `;
    }
  } catch (error) {
    console.error('Caught Error: ', error);
    return genericError;
  }
};
