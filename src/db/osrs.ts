import db from './firestore-client';

const usersSnap = db.collection('users');

interface UserData {
  username: string;
  gp: string;
  rngBuff?: number;
  lootEntries?: string[];
}

export const getUser = async (username: string) => {
  const docRef = await usersSnap.doc(username).get();
  if (!docRef.exists) return;
  const docData = docRef.data();
  return {
    username: docRef.id,
    gp: docData!.gp,
    rngBuff: docData!.rngBuff
  };
};

const createUser = async (
  username: string,
  gp?: string,
  loot?: string
): Promise<UserData> => {
  await usersSnap.doc(username).create({
    gp: gp ? gp : '0',
    lootEntries: loot ? [loot] : [],
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
    rngBuff: 0
  });
  return {
    username,
    gp: '0',
    rngBuff: 0
  };
};

export const updateUser = async (
  username: string,
  gp: string,
  itemInfo: string
): Promise<UserData> => {
  const docRef = await usersSnap.doc(username).get();
  if (!docRef.exists) {
    const user = await createUser(username, gp, itemInfo);
    return user;
  } else {
    const docData = docRef.data();
    await usersSnap.doc(username).update({
      gp,
      lootEntries: [...docData!.lootEntries, itemInfo],
      rngBuff: 0,
      updatedAt: new Date().toUTCString()
    });
    return {
      username: docRef.id,
      gp: docData!.gp
    };
  }
};

export const addRng = async (username: string) => {
  const docRef = await usersSnap.doc(username).get();
  if (docRef.exists) {
    let { rngBuff } = docRef.data() as UserData;
    if (!rngBuff) rngBuff = 0;
    if (rngBuff < 2) {
      rngBuff += 1;
      await usersSnap.doc(username).update({ rngBuff });
      if (rngBuff === 2) {
        return { success: `${username} now has a +${rngBuff} (MAX) RNG buff!` };
      } else {
        return { success: `${username} now has a +${rngBuff} RNG buff!` };
      }
    } else {
      return {
        error: `Silly ${username}, you're already at max RNG! (No RNG added)`
      };
    }
  } else {
    await createUser(username);
    await usersSnap.doc(username).update({ rngBuff: 1 });
    return { success: `${username} now has a +${1} RNG buff!` };
  }
};
