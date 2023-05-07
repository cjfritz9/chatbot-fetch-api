import { FieldValue } from 'firebase-admin/firestore';
import db from './firestore-client';

const docSnap = db.collection('joewatermelon').doc('dog_treats');

type LastDogRes =
  | {
      error: string;
    }
  | {
      lastDog: number;
    };

export const getLastDog = async () => {
  const docRef = await docSnap.get();
  if (!docRef.exists) {
    return { error: 'Database error - contact wandernaut#2205' };
  } else {
    return docRef.data();
  }
};

export const updateLastDog = (lastDog: number) => {
  docSnap.update({ lastDog });
  if (lastDog === 0) {
    docSnap.update({ finnCount: FieldValue.increment(1) });
  } else if (lastDog === 1) {
    docSnap.update({ tillyCount: FieldValue.increment(1) });
  } else if (lastDog === 2) {
    docSnap.update({ zippyCount: FieldValue.increment(1) });
  } else {
    docSnap.update({
      invalidNumberError: FieldValue.arrayUnion(
        `Received invalid id: ${lastDog}. ${new Date().toUTCString()}`
      )
    });
  }
};
