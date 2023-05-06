import { getLastDog, updateLastDog } from '../../db/joewatermelon';

export const TESTING_getDogTreat = async () => {
  const roll = Math.round(Math.random() * 2);
  const response = await getLastDog();
  if (!response) return { error: 'Database error - contact wandernaut#2205' };
  if (response.error) return response.error;
  console.log('last dog: ', response.lastDog);
  console.log('roll: ', roll);
  if (roll === response.lastDog) {
    return TESTING_getDogTreat();
  } else {
    updateLastDog(roll);
    console.log('last dog (post-recursion): ', response.lastDog);
    console.log('roll (post-recursion): ', roll);
    if (roll === 0) {
      return 'Finn is the good pupper and gets a treat! joewatFinn';
    } else if (roll === 1) {
      return 'Tilly is the good pupper and gets a treat! joewatTilly';
    } else {
      return 'Zippy is the good pupper and gets a treat! joewatZippy';
    }
  }
};

const getDogTreat = () => {
  const roll = Math.round(Math.random() * 2);
  if (roll === 0) {
    return 'Finn is the good pupper and gets a treat! joewatFinn';
  } else if (roll === 1) {
    return 'Tilly is the good pupper and gets a treat! joewatTilly';
  } else {
    return 'Zippy is the good pupper and gets a treat! joewatZippy';
  }
};

export default getDogTreat;
