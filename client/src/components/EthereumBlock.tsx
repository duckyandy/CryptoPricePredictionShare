import { useEffect, useState } from "react";
import requests from "../utils/requests";
import axios from "axios";
import { CryptoData } from "../../typings";

function BitcoinBlock() {
  const [ethInfo, setEthInfo] = useState<CryptoData | null>(null);
  const [ethPrice, setEthPrice] = useState<number>(0);

  const ws = new WebSocket("wss://stream.binance.com:9443/ws/ethusdt@trade");
  let lastPrice: number = 0;
  let color: string | null = null;

  useEffect(() => {
    async function fetchCryptoData() {
      const data = await axios
        .get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        )
        .then((response) => response.data);

      if (data) {
        const ethereumIndex = data.findIndex(
          (element: CryptoData) => element.id === "ethereum"
        );
        setEthInfo(data[ethereumIndex]);
      }
    }
    fetchCryptoData();
  }, []);

  return (
    <div>
      <div className="flex bg-gradient-to-r from-[#60d1dd] to-[#3be0b6] py-10 pl-10 space-x-10">
        <div className="transition hover:scale-150 hover:ease-in ease-out duration-200">
          <img src="/assets/eth.png" width="60" height="60" />
        </div>

        <div className="flex-col">
          <div>
            <p className={`inline-block font-bold text-sm`}>
              Current Price: {ethInfo?.current_price}
            </p>
          </div>
          <div>
            <p className="inline-block font-bold text-sm text-white">
              ATH: {ethInfo?.ath}
            </p>
          </div>
          <div>
            <p className="inline-block font-bold text-sm text-white">
              24hr High: {ethInfo?.high_24h}
            </p>
          </div>
          <div>
            <p className="inline-block font-bold text-sm text-white">
              24hr Low: {ethInfo?.low_24h}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BitcoinBlock;
