import { getLastDog, updateLastDog } from '../../db/joewatermelon';

const getDogTreat = async (lastDog = null): Promise<any> => {
  const roll = Math.round(Math.random());
  let response: any = { lastDog };
  // Skip call to database if recursion is running and lastDog
  // is already known
  if (lastDog === null) {
    response = await getLastDog();
  }
  if (!response) return { error: 'Database error - contact wandernaut#2205' };
  if (response.error) {
    console.error(response);
    return { error: 'Database error - contact wandernaut#2205' };
  }
  if (roll === response.lastDog) {
    return await getDogTreat(response.lastDog);
  } else {
    updateLastDog(roll);
    if (roll === 0) {
      return 'Finn is the good pupper and gets a treat! joewatFinn';
    } else if (roll === 1) {
      return 'Tilly is the good pupper and gets a treat! joewatTilly';
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
