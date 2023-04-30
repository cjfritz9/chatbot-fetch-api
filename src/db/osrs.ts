import db from './firestore-client';

const usersSnap = db.collection('users');

export const getUser = async (username: string) => {
  const docRef = await usersSnap.doc(username).get();
  if (!docRef.exists) {
    return { doesNotExist: 'No such user exists' };
  } else {
    return {
      username,
      ...docRef.data()
    };
  }
};

export const createUser = async (username: string) => {
  const user = await getUser(username);
  if (user.doesNotExist) {
    await usersSnap.doc(username).create({ gp: '0' });
    return {
      username,
      gp: '0'
    };
  } else {
    return user;
  }
};

export const updateUser = async (username: string, gp: 'string') => {
  const docRef = await usersSnap.doc(username).get();

  if (!docRef.exists) {
    return {
      noUserExists: `${username} was not found`
    };
  } else {
    await usersSnap.doc(username).update({ gp });
    return {
      username,
      gp
    };
  }
};
