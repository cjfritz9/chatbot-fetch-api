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
    return `No price information found for "${alpha}". Search by the start of the item's name; i.e. "tumeken" instead of "shadow"`;
  } else {
    const result = response.data.items[0];

    return `${result.name} is currently ${result.current.price}. Today: ${
      result.today.trend === 'negative'
        ? result.today.price.toString().replaceAll('-', '📉🔽 ')
        : result.today.price.toString().replace('+', '📈🔼 ')
    }`;
  }
};
