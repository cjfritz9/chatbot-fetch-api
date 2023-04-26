const getDogTreat = () => {
  const roll = Math.round(Math.random() * 2);

  if (roll === 0) {
    return 'Finn is a good pupper and gets a treat! joewatFinn';
  }
  if (roll === 1) {
    return 'Tilly is a good pupper and gets a treat! joewatTilly';
  }
  return 'Zippy is a good pupper and gets a treat! joewatZippy';
};

export default getDogTreat;
