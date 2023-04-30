import db from './firestore-client';

const usersSnap = db.collection('users-testing');

interface UserData {
  username: string;
  gp: string;
}

export const getUser = async (username: string) => {
  const docRef = await usersSnap.doc(username).get();
  const docData = docRef.data();
  return {
    username: docRef.id,
    gp: docData!.gp
  };
};

export const createUser = async (
  username: string,
  gp?: string,
  loot?: string
): Promise<UserData> => {
  const res = await usersSnap
    .doc(username)
    .create({ gp: gp ? gp : '0', lootEntries: loot ? [loot] : [] });
  const docRef = await usersSnap.doc(username).get();
  const docData = docRef.data();
  console.log('create user response: ', res);
  console.log('user doc ref: ', docRef);
  console.log('user doc data: ', docData);
  return {
    username: docRef.id,
    gp: docData!.gp
  };
};

export const updateUser = async (
  username: string,
  gp: string,
  itemInfo: string
): Promise<UserData> => {
  const docRef = await usersSnap.doc(username).get();
  if (!docRef.exists) {
    const user = await createUser(username, itemInfo);
    return user;
  } else {
    const docData = docRef.data();
    await usersSnap
      .doc(username)
      .update({ gp, lootEntries: [...docData!.lootEntries, itemInfo] });
    return {
      username: docRef.id,
      gp: docData!.gp
    };
  }
};
