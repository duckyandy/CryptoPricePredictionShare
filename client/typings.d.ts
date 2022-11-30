export type CryptoData = {
  ath: number;
  ath_change_percentage: number;
  atl: number;
  circulating_supply: number;
  current_price: number;
  high_24h: number;
  id: string;
  low_24h: number;
};

export type CryptoChoose4 = "BTC" | "ETH" | "DOGE" | "MATIC";

export interface ICryptoPrediction {
  coin: String;
  predictionComment: String;
}
