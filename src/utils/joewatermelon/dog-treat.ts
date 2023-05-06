import { getLastDog, updateLastDog } from '../../db/joewatermelon';

const getDogTreat = async (lastDog = null): Promise<any> => {
  const roll = Math.random() * 99;
  let response: any = { lastDog };
  // Skip call to database if recursion is running and lastDog
  // is already known
  if (lastDog === null) {
    response = await getLastDog();
    console.log('db response: ', response);
  }
  if (!response) return { error: 'Database error - contact wandernaut#2205' };
  if (response.error) return response.error;
  console.log('last dog: ', response.lastDog);
  console.log('roll: ', roll);
  if (roll === response.lastDog) {
    return getDogTreat(response.lastDog);
  } else {
    console.log('last dog (post-recursion): ', response.lastDog);
    console.log('roll (post-recursion): ', roll);
    if (roll <= 32) {
      updateLastDog(0);
      return 'Finn is the good pupper and gets a treat! joewatFinn';
    } else if (roll <= 65) {
      updateLastDog(1);
      return 'Tilly is the good pupper and gets a treat! joewatTilly';
    } else {
      updateLastDog(2);
      return 'Zippy is the good pupper and gets a treat! joewatZippy';
    }
  }
};
/**
 * Deprecated. Rolls 0-2 to simply return one of the three options.
 * The new method removes rolling the same option twice in a row.
 */
// const DEP_getDogTreat = () => {
//   const roll = Math.round(Math.random() * 2);
//   if (roll === 0) {
//     return 'Finn is the good pupper and gets a treat! joewatFinn';
//   } else if (roll === 1) {
//     return 'Tilly is the good pupper and gets a treat! joewatTilly';
//   } else {
//     return 'Zippy is the good pupper and gets a treat! joewatZippy';
//   }
// };

export default getDogTreat;
