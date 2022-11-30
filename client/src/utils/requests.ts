const BASE_URL = "https://api.coingecko.com/api/v3/simple/price?ids=";

const requests = {
  fetchBtcPrice: `${BASE_URL}btc&vs_currencies=usd`,
  fetchEthPrice: `${BASE_URL}ethereum&vs_currencies=usd`,
  fetchDogePrice: `${BASE_URL}dogecoin&vs_currencies=usd`,
  fetchMaticPrice: `${BASE_URL}matic_network&vs_currencies=usd`,
};

export default requests;
