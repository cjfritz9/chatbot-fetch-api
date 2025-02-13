import axios from 'axios';

export const fetchAndAddPrices = async (
  items: { itemId: string; quantity: number }[]
) => {
  const OSRS_API = 'https://prices.runescape.wiki/api/v1/osrs/latest';
  const headers = { 'User-Agent': 'chatbot_raid_sim - @wandernaut#2205' };

  const responses = await Promise.all(
    items.map((item) => {
      return axios.get(`${OSRS_API}?id=${item.itemId}`, {
        headers
      });
    })
  );
  let totalValue = '0';
  responses.map((res, i) => {
    if (res?.data?.data) {
      const itemPrices = res.data.data[items[i].itemId];

      if (itemPrices) {
        const stackValue =
          +getMedianPrice(itemPrices.low, itemPrices.high) * items[i].quantity;
        totalValue = (+totalValue + +stackValue).toString();
      } else {
        if (items[i].itemId === '-1') {
          totalValue = (+totalValue + 350000).toString();
        } else if (items[i].itemId === '1') {
          totalValue = (+totalValue + items[i].quantity).toString();
        } else {
          totalValue = totalValue;
        }
      }
    }
  });
  return totalValue;
};

export const formatGP = (gp: string) => {
  if (gp.length < 7) {
    return gp.slice(0, gp.length - 3) + 'k';
  } else if (gp.length < 10) {
    return gp.slice(0, gp.length - 6) + '.' + gp.charAt(1) + 'M';
  } else if (gp.length < 13) {
    return gp.slice(0, gp.length - 9) + '.' + gp.charAt(1) + 'B';
  } else {
    return gp.slice(0, gp.length - 12) + '.' + gp.charAt(1) + 'T';
  }
};

export const getMedianPrice = (lowPrice: number, highPrice: number) => {
  const diff = highPrice - lowPrice;
  return Math.round(lowPrice + diff / 2).toString();
};

export const standardCoxLoot = [
  { name: 'Death rune', id: '560', maxQty: 3640 },
  { name: 'Blood rune', id: '565', maxQty: 4095 },
  { name: 'Soul rune', id: '566', maxQty: 6553 },
  { name: 'Rune Arrow', id: '892', maxQty: 9362 },
  { name: 'Dragon Arrow', id: '11212', maxQty: 648 },
  { name: 'Grimy ranarr weed', id: '207', maxQty: 163 },
  { name: 'Grimy toadflax', id: '3049', maxQty: 248 },
  { name: 'Grimy irit leaf', id: '209', maxQty: 809 },
  { name: 'Grimy avantoe', id: '211', maxQty: 404 },
  { name: 'Grimy kwuarm', id: '213', maxQty: 338 },
  { name: 'Grimy snapdragon', id: '3051', maxQty: 97 },
  { name: 'Grimy cadantine', id: '215', maxQty: 394 },
  { name: 'Grimy lantadyme', id: '2485', maxQty: 526 },
  { name: 'Grimy dwarf weed', id: '217', maxQty: 655 },
  { name: 'Grimy torstol', id: '219', maxQty: 161 },
  { name: 'Silver ore', id: '442', maxQty: 6553 },
  { name: 'Coal', id: '453', maxQty: 6553 },
  { name: 'Gold ore', id: '444', maxQty: 2978 },
  { name: 'Mithril ore', id: '447', maxQty: 4095 },
  { name: 'Adamantite ore', id: '449', maxQty: 789 },
  { name: 'Runite ore', id: '451', maxQty: 65 },
  { name: 'Uncut sapphire', id: '1623', maxQty: 693 },
  { name: 'Uncut emerald', id: '1621', maxQty: 923 },
  { name: 'Uncut ruby', id: '1619', maxQty: 541 },
  { name: 'Uncut diamond', id: '1617', maxQty: 255 },
  { name: 'Lizardman fang', id: '13391', maxQty: 4681 },
  { name: 'Pure essence', id: '7936', maxQty: 65535 },
  { name: 'Saltpetre', id: '13421', maxQty: 5461 },
  { name: 'Teak plank', id: '8780', maxQty: 1365 },
  { name: 'Mahogany plank', id: '8782', maxQty: 548 },
  { name: 'Dynamite', id: '13573', maxQty: 2427 },
  { name: 'Torn prayer scroll', id: '21047', maxQty: 1 },
  { name: 'Dark relic', id: '0', maxQty: 1 }
];

export const standardTobLoot = [
  { name: 'Vial of blood', id: '22446', minQty: 50, maxQty: 60 },
  { name: 'Death rune', id: '560', minQty: 500, maxQty: 600 },
  { name: 'Blood rune', id: '565', minQty: 500, maxQty: 600 },
  { name: 'Swamp tar', id: '1939', minQty: 500, maxQty: 600 },
  { name: 'Coal', id: '453', minQty: 500, maxQty: 600 },
  { name: 'Gold ore', id: '444', minQty: 300, maxQty: 360 },
  { name: 'Molten glass', id: '1775', minQty: 200, maxQty: 240 },
  { name: 'Adamantite ore', id: '449', minQty: 130, maxQty: 156 },
  { name: 'Runite ore', id: '451', minQty: 60, maxQty: 72 },
  { name: 'Wine of zamorak', id: '245', minQty: 50, maxQty: 60 },
  { name: 'Potato cactus', id: '3138', minQty: 50, maxQty: 60 },
  { name: 'Grimy cadantine', id: '215', minQty: 50, maxQty: 60 },
  { name: 'Grimy avantoe', id: '211', minQty: 40, maxQty: 48 },
  { name: 'Grimy toadflax', id: '3049', minQty: 37, maxQty: 44 },
  { name: 'Grimy kwuarm', id: '213', minQty: 36, maxQty: 43 },
  { name: 'Grimy irit leaf', id: '209', minQty: 34, maxQty: 40 },
  { name: 'Grimy ranarr weed', id: '207', minQty: 30, maxQty: 36 },
  { name: 'Grimy snapdragon', id: '3051', minQty: 27, maxQty: 32 },
  { name: 'Grimy lantadyme', id: '2485', minQty: 26, maxQty: 31 },
  { name: 'Grimy dwarf weed', id: '217', minQty: 24, maxQty: 28 },
  { name: 'Grimy torstol', id: '219', minQty: 20, maxQty: 24 },
  { name: 'Battlestaff', id: '1391', minQty: 15, maxQty: 18 },
  { name: 'Rune battleaxe', id: '1373', minQty: 4, maxQty: 4 },
  { name: 'Rune platebody', id: '1127', minQty: 4, maxQty: 4 },
  { name: 'Rune chainbody', id: '1113', minQty: 4, maxQty: 4 },
  { name: 'Palm tree seed', id: '5289', minQty: 3, maxQty: 3 },
  { name: 'Yew seed', id: '5315', minQty: 3, maxQty: 3 },
  { name: 'Magic seed', id: '5316', minQty: 3, maxQty: 3 },
  { name: 'Mahogany seed', id: '21488', minQty: 10, maxQty: 12 }
];

export const standardToaLoot = [
  { name: 'Coins', id: '1', baseQty: 23136 },
  { name: 'Death rune', id: '560', baseQty: 1155 },
  { name: 'Soul rune', id: '566', baseQty: 577 },
  { name: 'Gold ore', id: '444', baseQty: 256 },
  { name: 'Dragon dart tip', id: '11232', baseQty: 231 },
  { name: 'Mahogany log', id: '6332', baseQty: 127 },
  { name: 'Sapphire', id: '1607', baseQty: 114 },
  { name: 'Emerald', id: '1605', baseQty: 92 },
  { name: 'Gold bar', id: '2357', baseQty: 92 },
  { name: 'Potato cactus', id: '3138', baseQty: 92 },
  { name: 'Raw shark', id: '383', baseQty: 92 },
  { name: 'Ruby', id: '1603', baseQty: 77 },
  { name: 'Diamond', id: '1601', baseQty: 57 },
  { name: 'Raw manta ray', id: '389', baseQty: 50 },
  { name: 'Cactus spine', id: '6016', baseQty: 37 },
  { name: 'Dragonstone', id: '1615', baseQty: 37 },
  { name: 'Battlestaff', id: '1391', baseQty: 20 },
  { name: 'Coconut milk', id: '5935', baseQty: 20 },
  { name: 'Lily of the sands', id: '27272', baseQty: 20 },
  { name: 'Toadflax seed', id: '5296', baseQty: 16 },
  { name: 'Ranarr seed', id: '5295', baseQty: 12 },
  { name: 'Torstol seed', id: '5304', baseQty: 10 },
  { name: 'Snapdragon seed', id: '5300', baseQty: 10 },
  { name: 'Dragon med helm', id: '1149', baseQty: 5 },
  { name: 'Magic seed', id: '5316', baseQty: 3 },
  { name: 'Blood essence', id: '26390', baseQty: 2 },
  { name: 'Cache of Runes', id: '-1', baseQty: 1 }
];

export const coxRollQuantity = (maxQty: number, didPlank = false) => {
  const quantity = maxQty / 3.3;
  if (maxQty === 1) return 1;
  if (didPlank) {
    return Math.round(quantity);
  } else {
    return Math.round(quantity / 2);
  }
};

export const tobRollQuantity = (minQty: number, maxQty: number) => {
  return minQty + Math.round(Math.random() * (maxQty - minQty));
};

export const toaRollQuantity = (baseQty: number, raidRoll: number) => {
  const multiplier = raidRoll * 0.14;
  if (baseQty === 1) return baseQty;
  return baseQty + Math.round(baseQty * multiplier);
};
