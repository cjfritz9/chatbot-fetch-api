const getDogTreat = () => {
  const roll = Math.round(Math.random() * 99);

  if (roll < 33) {
    return 'Finn is the good pupper and gets a treat! joewatFinn';
  } else if (roll < 66) {
    return 'Tilly is the good pupper and gets a treat! joewatTilly';
  } else if (roll < 99) {
    return 'Zippy is the good pupper and gets a treat! joewatZippy';
  } else {
    return 'Joe is the good boy and gets a pat PATTHEMELON (1/100)'
  }
};

export default getDogTreat;
