import {
  coxRollQuantity,
  standardCoxLoot,
  standardToaLoot,
  standardTobLoot,
  toaRollQuantity,
  tobRollQuantity
} from './helpers';

export const raidCox = (rngBuff = 0) => {
  //@ts-ignore
  let purpleThreshold = 867500;
  if (rngBuff === 1) {
    purpleThreshold = purpleThreshold / 8;
  }
  if (rngBuff === 2) {
    purpleThreshold = purpleThreshold / 16;
  }
  const { points, didPlank } = getCoxPoints();
  console.log(points, purpleThreshold);
  console.log(points / purpleThreshold);
  let isPurple = false;
  if (Math.random() < points / purpleThreshold) {
    isPurple = true;
  }
  if (isPurple) {
    return getCoxPurple(rngBuff, points, didPlank);
  } else {
    const roll1 = standardCoxLoot[Math.round(Math.random() * 32)];
    const roll2 = standardCoxLoot[Math.round(Math.random() * 32)];
    const roll1qty = coxRollQuantity(roll1.maxQty, didPlank);
    const roll2qty = coxRollQuantity(roll2.maxQty, didPlank);
    const response = {
      points,
      didPlank,
      beam: 'white',
      itemInfo: [
        { itemId: roll1.id, quantity: roll1qty },
        { itemId: roll2.id, quantity: roll2qty }
      ],
      itemName: `${roll1qty}x ${roll1.name} and ${roll2qty}x ${roll2.name}`,
      dbEntry: {
        item: `${roll1qty}x ${roll1.name} and ${roll2qty}x ${roll2.name}`,
        price: '',
        dateReceived: new Date().toUTCString()
      }
    };

    return response;
  }
};

export const getCoxPurple = (
  rngBuff = 0,
  points: number,
  didPlank: boolean
) => {
  //@ts-ignore
  const roll = getRoll(rngBuff);
  const response = {
    points,
    didPlank,
    beam: 'purple',
    itemInfo: [{ itemId: '0', quantity: 1 }],
    itemName: '',
    dbEntry: {
      item: '',
      price: '',
      dateReceived: new Date().toUTCString()
    }
  };

  if (roll < 29.986) {
    response.itemInfo[0].itemId = '21034';
    response.itemName = 'a Dexterous prayer scroll';
    response.dbEntry.item = 'Dexterous prayer scroll';
  } else if (roll < 57.972) {
    response.itemInfo[0].itemId = '21079';
    response.itemName = 'an Arcane prayer scroll';
    response.dbEntry.item = 'Arcane prayer scroll';
  } else if (roll < 63.769) {
    response.itemInfo[0].itemId = '21000';
    response.itemName = 'a Twisted buckler';
    response.dbEntry.item = 'Twisted buckler';
  } else if (roll < 69.566) {
    response.itemInfo[0].itemId = '21012';
    response.itemName = 'a Dragon hunter crossbow';
    response.dbEntry.item = 'Dragon hunter crossbow';
  } else if (roll < 73.914) {
    response.itemInfo[0].itemId = '21015';
    response.itemName = "a Dinh's bulwark";
    response.dbEntry.item = "Dinh's bulwark";
  } else if (roll < 78.262) {
    response.itemInfo[0].itemId = '21018';
    response.itemName = 'an Ancestral hat';
    response.dbEntry.item = 'Ancestral hat';
  } else if (roll < 82.61) {
    response.itemInfo[0].itemId = '21021';
    response.itemName = 'an Ancestral robe top';
    response.dbEntry.item = 'Ancestral robe top';
  } else if (roll < 86.958) {
    response.itemInfo[0].itemId = '21024';
    response.itemName = 'an Ancestral robe bottom';
    response.dbEntry.item = 'Ancestral robe bottom';
  } else if (roll < 91.306) {
    response.itemInfo[0].itemId = '13652';
    response.itemName = 'Dragon claws';
    response.dbEntry.item = 'Dragon claws';
  } else if (roll < 94.205) {
    response.itemInfo[0].itemId = '21003';
    response.itemName = 'an Elder maul';
    response.dbEntry.item = 'Elder maul';
  } else if (roll < 97.104) {
    response.itemInfo[0].itemId = '21043';
    response.itemName = 'a Kodai insignia';
    response.dbEntry.item = 'Kodai insignia';
  } else {
    response.itemInfo[0].itemId = '20997';
    response.itemName = 'a Twisted bow TBow';
    response.dbEntry.item = 'Twisted bow';
  }

  return response;
};

export const raidTob = (rngBuff = 0) => {
  //@ts-ignore
  const { deaths, weDoRaids, horribleRng } = getTobStats(rngBuff);
  let purpleThreshold = 0.10989;
  purpleThreshold -= deaths * 0.0065;
  const purpleRoll = Math.random();
  if (rngBuff === 1) {
    purpleThreshold = purpleThreshold * 4;
  }
  if (rngBuff === 2) {
    purpleThreshold = purpleThreshold * 8;
  }

  let isPurple = false;
  if (purpleRoll < purpleThreshold) {
    isPurple = true;
  }
  if (isPurple) {
    return getTobPurple(rngBuff, deaths, weDoRaids, horribleRng);
  } else {
    const roll1 = standardTobLoot[Math.round(Math.random() * 28)];
    const roll2 = standardTobLoot[Math.round(Math.random() * 28)];
    const roll3 = standardTobLoot[Math.round(Math.random() * 28)];
    const roll1qty = tobRollQuantity(roll1.minQty, roll1.maxQty);
    const roll2qty = tobRollQuantity(roll2.minQty, roll2.maxQty);
    const roll3qty = tobRollQuantity(roll3.minQty, roll3.maxQty);
    const response = {
      deaths,
      weDoRaids,
      horribleRng,
      chestColor: 'white',
      itemInfo: [
        { itemId: roll1.id, quantity: roll1qty },
        { itemId: roll2.id, quantity: roll2qty },
        { itemId: roll3.id, quantity: roll3qty }
      ],
      itemName: `${roll1qty}x ${roll1.name}, ${roll2qty}x ${roll2.name}, and ${roll3qty}x ${roll3.name}`,
      dbEntry: {
        item: `${roll1qty}x ${roll1.name}, ${roll2qty}x ${roll2.name}, and ${roll3qty}x ${roll3.name}`,
        price: '',
        dateReceived: new Date().toUTCString()
      }
    };

    return response;
  }
};

export const getTobPurple = (
  rngBuff = 0,
  deaths: number,
  weDoRaids: boolean,
  horribleRng: boolean
) => {
  //@ts-ignore
  const roll = getRoll(rngBuff);
  const response = {
    deaths,
    weDoRaids,
    horribleRng,
    chestColor: 'purple',
    itemInfo: [{ itemId: '0', quantity: 1 }],
    itemName: '',
    dbEntry: {
      item: '',
      price: '',
      dateReceived: new Date().toUTCString()
    }
  };

  if (roll < 42.105) {
    response.itemInfo[0].itemId = '22477';
    response.itemName = 'Avernic defender hilt';
  } else if (roll < 52.631) {
    response.itemInfo[0].itemId = '22324';
    response.itemName = 'Ghrazi rapier';
  } else if (roll < 63.157) {
    response.itemInfo[0].itemId = '22481';
    response.itemName = 'Sanguinesti staff (uncharged)';
  } else if (roll < 73.683) {
    response.itemInfo[0].itemId = '22326';
    response.itemName = 'Justiciar faceguard';
  } else if (roll < 84.209) {
    response.itemInfo[0].itemId = '22327';
    response.itemName = 'Justiciar chestguard';
  } else if (roll < 94.735) {
    response.itemInfo[0].itemId = '22328';
    response.itemName = 'Justiciar legguards';
  } else {
    response.itemInfo[0].itemId = '22486';
    response.itemName = 'Scythe of vitur (uncharged) ScytheV';
  }
  response.dbEntry.item = response.itemName;
  return response;
};

export const raidToa = (rngBuff = 0) => {
  //@ts-ignore
  // const { deaths, weDoRaids, horribleRng } = getTobStats(rngBuff);
  const raidRoll = Math.round(Math.random() * 4);
  const raidLevel = raidRoll * 50 + 300;
  let purpleThreshold: number;
  if (raidLevel === 300) {
    purpleThreshold = 0.0447;
  } else if (raidLevel === 350) {
    purpleThreshold = 0.0615;
  } else if (raidLevel === 400) {
    purpleThreshold = 0.0918;
  } else if (raidLevel === 450) {
    purpleThreshold = 0.1118;
  } else {
    purpleThreshold = 0.1401;
  }
  const purpleRoll = Math.random();
  if (rngBuff === 1) {
    purpleThreshold = purpleThreshold * 3;
  }
  if (rngBuff === 2) {
    purpleThreshold = purpleThreshold * 6;
  }
  let isPurple = false;
  if (purpleRoll < purpleThreshold) {
    isPurple = true;
  }
  if (isPurple) {
    return getToaPurple(rngBuff, raidLevel);
    // return getTobPurple(rngBuff, deaths, weDoRaids, horribleRng);
  } else {
    const roll1 = standardToaLoot[Math.round(Math.random() * 26)];
    const roll2 = standardToaLoot[Math.round(Math.random() * 26)];
    const roll3 = standardToaLoot[Math.round(Math.random() * 26)];
    const roll1qty = toaRollQuantity(roll1.baseQty, raidRoll);
    const roll2qty = toaRollQuantity(roll2.baseQty, raidRoll);
    const roll3qty = toaRollQuantity(roll3.baseQty, raidRoll);
    const response = {
      raidLevel,
      chestColor: 'white',
      itemInfo: [
        { itemId: roll1.id, quantity: roll1qty },
        { itemId: roll2.id, quantity: roll2qty },
        { itemId: roll3.id, quantity: roll3qty }
      ],
      itemName: `${roll1qty}x ${roll1.name}, ${roll2qty}x ${roll2.name}, and ${roll3qty}x ${roll3.name}`,
      dbEntry: {
        item: `${roll1qty}x ${roll1.name}, ${roll2qty}x ${roll2.name}, and ${roll3qty}x ${roll3.name}`,
        price: '',
        dateReceived: new Date().toUTCString()
      }
    };

    return response;
  }
};

export const getToaPurple = (rngBuff = 0, raidLevel: number) => {
  //@ts-ignore
  const roll = getRoll(rngBuff);
  const response = {
    raidLevel,
    chestColor: 'purple',
    itemInfo: [{ itemId: '0', quantity: 1 }],
    itemName: '',
    dbEntry: {
      item: '',
      price: '',
      dateReceived: new Date().toUTCString()
    }
  };

  if (roll < 29.163) {
    response.itemInfo[0].itemId = '26219';
    response.itemName = "Osmumten's fang";
  } else if (roll < 58.326) {
    response.itemInfo[0].itemId = '25975';
    response.itemName = 'Lightbearer';
  } else if (roll < 70.826) {
    response.itemInfo[0].itemId = '26804';
    response.itemName = "Elidinis' ward";
  } else if (roll < 79.159) {
    response.itemInfo[0].itemId = '27241';
    response.itemName = 'Masori mask';
  } else if (roll < 87.492) {
    response.itemInfo[0].itemId = '27355';
    response.itemName = 'Masori body';
  } else if (roll < 95.825) {
    response.itemInfo[0].itemId = '27238';
    response.itemName = 'Masori chaps';
  } else {
    response.itemInfo[0].itemId = '27277';
    response.itemName = "Tumeken's shadow (uncharged) Shadow";
  }
  response.dbEntry.item = response.itemName;

  return response;
};

const getRoll = (rngBuff: 0 | 1 | 2) => {
  let roll = Math.random() * 100;
  if (rngBuff === 0) {
    console.log({ 'rng0 roll': roll });
    return roll;
  } else if (rngBuff === 1) {
    const difference = 100 - roll;
    roll += Math.random() * difference;
    console.log({ 'rng1 roll': roll });
    return roll;
  } else {
    const roll1 = Math.random() * 100;
    const roll2 = Math.random() * 100;
    let bestRoll = Math.max(roll, roll1, roll2);
    const difference = 100 - bestRoll;
    bestRoll += Math.random() * difference;

    console.log({ 'rng2 roll': bestRoll });
    return bestRoll;
  }
};

const getCoxPoints = () => {
  let points = Math.random() * 15000 + 25000;
  const plankRoll = Math.random() * 100;
  let didPlank = false;
  if (plankRoll < 6.5) {
    points = points / 1.75;
    didPlank = true;
  }
  return {
    didPlank,
    points
  };
};

const getTobStats = (rngBuff = 0) => {
  const wdrRoll = Math.random() * 99;
  const deathRoll = Math.random() * 99;
  const chadWDR = wdrRoll < 5 ? true : false;
  let deaths = 0;
  let weDoRaids = false;
  let horribleRng = false;

  if (wdrRoll < 50) {
    weDoRaids = true;
  }
  if (deathRoll < 5) {
    deaths += 2;
  } else if (deathRoll < 25) {
    deaths += 1;
  }

  if (weDoRaids === true) {
    if (chadWDR) {
      deaths = 0;
    } else {
      deaths += 2;
    }
  }
  if (wdrRoll < 1) {
    horribleRng = true;
  }

  if (rngBuff === 2) {
    deaths = 0;
    weDoRaids = false;
    horribleRng = false;
  }
  return { deaths, weDoRaids, horribleRng };
};
