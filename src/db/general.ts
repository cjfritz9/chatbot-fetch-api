import db from './firestore-client';

const vipSnap = db.collection('general').doc('vip_rolls');
const getChannelWinnersSnap = (channelName: string) =>
  vipSnap.collection('channels').doc(channelName).collection('winners');

export const getVipWinner = async (channelName: string, username: string) => {
  const winnerDoc = await getChannelWinnersSnap(channelName).where('username', '==', username).get();


}