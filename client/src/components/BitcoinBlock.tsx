import { useEffect, useState } from "react";
import requests from "../utils/requests";
import axios from "axios";
import { CryptoData } from "../../typings";

function BitcoinBlock() {
  const [btcInfo, setBtcInfo] = useState<CryptoData | null>(null);

  useEffect(() => {
    async function fetchCryptoData() {
      const data = await axios
        .get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        )
        .then((response) => response.data);

      if (data) {
        // const bitcoinIndex = data[0].id;
        const bitcoinIndex = data.findIndex(
          (element: CryptoData) => element.id === "bitcoin"
        );
        setBtcInfo(data[bitcoinIndex]);
      }
    }
    fetchCryptoData();
  }, []);

  return (
    <div>
      <div className="flex bg-gradient-to-r from-[#cdb4db] to-[#ffc8dd] py-10 pl-10 space-x-10">
        <div className="transition hover:scale-150 hover:ease-in ease-out duration-200">
          <img src="/assets/btc.png" width="60" height="60" />
        </div>

        <div className="flex-col">
          <div>
            <p className={`inline-block font-bold text-sm`}>
              Current Price: {btcInfo?.current_price}
            </p>
          </div>
          <div>
            <p className="inline-block font-bold text-sm text-white">
              ATH: {btcInfo?.ath}
            </p>
          </div>
          <div>
            <p className="inline-block font-bold text-sm text-white">
              24hr High: {btcInfo?.high_24h}
            </p>
          </div>
          <div>
            <p className="inline-block font-bold text-sm text-white">
              24hr Low: {btcInfo?.low_24h}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BitcoinBlock;
