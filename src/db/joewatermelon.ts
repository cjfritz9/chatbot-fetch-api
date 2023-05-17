import { FieldValue } from 'firebase-admin/firestore';
import db from './firestore-client';

const treatsSnap = db.collection('joewatermelon').doc('dog_treats');
const gpSnap = db.collection('joewatermelon').doc('gp_rewards');

export const getLastDog = async () => {
  const docRef = await treatsSnap.get();
  if (!docRef.exists) {
    return { error: 'Database error - contact wandernaut#2205' };
  } else {
    return docRef.data();
  }
};

export const updateLastDog = (lastDog: number) => {
  treatsSnap.update({ lastDog });
  if (lastDog === 0) {
    treatsSnap.update({ finnCount: FieldValue.increment(1) });
  } else if (lastDog === 1) {
    treatsSnap.update({ tillyCount: FieldValue.increment(1) });
  } else if (lastDog === 2) {
    treatsSnap.update({ zippyCount: FieldValue.increment(1) });
  } else {
    treatsSnap.update({
      invalidNumberError: FieldValue.arrayUnion(
        `Received invalid id: ${lastDog}. ${new Date().toUTCString()}`
      )
    });
  }
};

export const addGpRewardEntry = async (username: string, gpAmount: string) => {
  const userSnap = gpSnap.collection('users').doc(username);
  const userDoc = await userSnap.get();

  if (userDoc.exists) {
    userSnap.update({
      rewardEntries: FieldValue.arrayUnion(
        JSON.stringify({ gpAmount, dateReceived: new Date().toUTCString() })
      )
    });
  } else {
    userSnap.create({
      rewardEntries: FieldValue.arrayUnion(
        JSON.stringify({ gpAmount, dateReceived: new Date().toUTCString() })
      )
    });
  }
};
