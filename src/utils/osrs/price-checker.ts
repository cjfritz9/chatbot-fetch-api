import axios from 'axios';

/**
 * Alpha referes to the start of a query string, i.e "Twist"
 * being the start of a query searching for "Twisted Bow"
 */
export const getItemPriceByAlpha = async (alpha: string) => {
  const BASE_API = `https://secure.runescape.com/m=itemdb_oldschool/api/catalogue/items.json?category=1&alpha=${alpha}&page=1`;

  const response = await axios.get(BASE_API);

  if (!response || !response.data) {
    return 'Error fetching Grand Exchange data';
  } else if (!response.data.items[0]) {
    return `No price information found for "${alpha}". Check spelling and try again`;
  } else {
    const result = response.data.items[0];
    console.log(result.name);
    console.log(result.today);
    return `${result.name} is currently ${result.current.price}. Daily trend: ${
      result.today.trend === 'negative'
        ? result.today.price.toString().replaceAll('-', '📉🔽 ')
        : result.today.price.toString().replace('+', '📈🔼 ')
    }`;
  }
};
