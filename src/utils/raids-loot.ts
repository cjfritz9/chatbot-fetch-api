export const getCoxPurple = (rngBuff = false) => {
  const roll = rngBuff ? getBuffedRoll() : Math.random() * 100;
  let rewardMessage = 'Special Loot: ';

  if (roll < 29.986) {
    rewardMessage += 'Dexterous prayer scroll';
  } else if (roll < 57.972) {
    rewardMessage += 'Arcane prayer scroll';
  } else if (roll < 63.769) {
    rewardMessage += 'Twisted buckler';
  } else if (roll < 69.566) {
    rewardMessage += 'Dragon hunter crossbow';
  } else if (roll < 73.914) {
    rewardMessage += "Dinh's bulwark";
  } else if (roll < 78.262) {
    rewardMessage += 'Ancestral hat';
  } else if (roll < 82.61) {
    rewardMessage += 'Ancestral robe top';
  } else if (roll < 86.958) {
    rewardMessage += 'Ancestral robe bottom';
  } else if (roll < 91.306) {
    rewardMessage += 'Dragon claws';
  } else if (roll < 94.205) {
    rewardMessage += 'Elder maul';
  } else if (roll < 97.104) {
    rewardMessage += 'Kodai insignia';
  } else {
    rewardMessage += 'Twisted bow';
  }

  return rewardMessage;
};

export const getTobPurple = (rngBuff = false) => {
  const roll = rngBuff ? getBuffedRoll() : Math.random() * 100;

  let rewardMessage = 'You found something special: ';

  if (roll < 42.105) {
    rewardMessage += 'Avernic defender hilt';
  } else if (roll < 52.631) {
    rewardMessage += 'Ghrazi rapier';
  } else if (roll < 63.157) {
    rewardMessage += 'Sanguinesti staff (uncharged)';
  } else if (roll < 73.683) {
    rewardMessage += 'Justiciar faceguard';
  } else if (roll < 84.209) {
    rewardMessage += 'Justiciar chestguard';
  } else if (roll < 94.735) {
    rewardMessage += 'Justiciar legguards';
  } else {
    rewardMessage += 'Scythe of vitur (uncharged)';
  }
  return rewardMessage;
};

export const getToaPurple = (rngBuff = false) => {
  const roll = rngBuff ? getBuffedRoll() : Math.random() * 100;

  let rewardMessage = 'You found something special: ';

  if (roll < 29.163) {
    rewardMessage += "Osmumten's fang";
  } else if (roll < 58.326) {
    rewardMessage += 'Lightbearer';
  } else if (roll < 70.826) {
    rewardMessage += "Elidinis' ward";
  } else if (roll < 79.159) {
    rewardMessage += 'Masori mask';
  } else if (roll < 87.492) {
    rewardMessage += 'Masori body';
  } else if (roll < 95.825) {
    rewardMessage += 'Masori chaps';
  } else if (roll < 99.991) {
    rewardMessage += "Tumeken's shadow (uncharged)";
  } else {
    if (rngBuff) {
      rewardMessage += "Tumeken's shadow (uncharged)";
    } else {
      rewardMessage += 'Fossilised dung';
    }
  }

  return rewardMessage;
};

const getBuffedRoll = () => {
  const roll1 = Math.random() * 100;
  const roll2 = Math.random() * 100;
  let bestRoll = roll1 > roll2 ? roll1 : roll2;
  const difference = 100 - bestRoll;
  bestRoll += Math.random() * difference;
  return bestRoll;
};
