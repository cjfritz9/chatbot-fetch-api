import db from './firestore-client';

const vipSnap = db.collection('general').doc('vip_rolls');

const getChannelWinnersCol = (channelName: string) =>
  vipSnap.collection('channels').doc(channelName).collection('winners');

export const addVipWinner = async (channelName: string, username: string) => {
  const winnersCol = getChannelWinnersCol(channelName);
  const winnerSnap = winnersCol.doc(username);
  const winnerDoc = await winnerSnap.get();

  if (winnerDoc.exists) {
    winnerSnap.update({
      dateCreated: new Date().toUTCString()
    });
  } else {
    winnersCol.doc(username).create({
      dateCreated: new Date().toUTCString()
    });
  }
};

export const getVipWinner = async (channelName: string, username: string) => {
  const winnerDoc = await getChannelWinnersCol(channelName)
    .where('username', '==', username)
    .get();
};
