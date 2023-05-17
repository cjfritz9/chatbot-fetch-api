const getRandomGP = (username: string) => {
  const tableRoll = Math.round(Math.random() * 48) + 51;
  const failRoll = Math.round(Math.random() * 99) === 0 ? true : false;
  console.log(failRoll);
  
  if (failRoll) {
    return `${username} rolled 0 and won 1 GP x0r6ztGiggle !!`;
  }

  if (tableRoll === 73) {
    return `${username} rolled ${tableRoll} and won 73 GP x0r6ztGiggle`;
  } else if (tableRoll === 99) {
    return `${username} rolled ${tableRoll} and won 10M GP PogOBusiness`;
  } else {
    const gpRoll = (Math.round(Math.random() * 49) + 26) * 10;
    return `${username} rolled ${tableRoll} and won ${gpRoll}k!`;
  }
};

export default getRandomGP;
