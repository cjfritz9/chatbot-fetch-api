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
};
