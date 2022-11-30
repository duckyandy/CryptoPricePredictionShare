import { useEffect, useState } from "react";
import requests from "../utils/requests";
import axios from "axios";
import { CryptoData } from "../../typings";

function DogecoinBlock() {
  const [dogeInfo, setDogeInfo] = useState<CryptoData | null>(null);

  useEffect(() => {
    async function fetchCryptoData() {
      const data = await axios
        .get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        )
        .then((response) => response.data);

      if (data) {
        // const bitcoinIndex = data[0].id;
        const dogecoinIndex = data.findIndex(
          (element: CryptoData) => element.id === "dogecoin"
        );
        setDogeInfo(data[dogecoinIndex]);
      }
    }
    fetchCryptoData();
  }, []);

  return (
    <div>
      <div className="flex bg-gradient-to-r from-[#ee8ccb] to-[#ed24aa] py-10 pl-10 space-x-10">
        <div className="transition hover:scale-150 hover:ease-in ease-out duration-200">
          <img src="/assets/doge.png" width="60" height="60" />
        </div>

        <div className="flex-col">
          <div>
            <p className={`inline-block font-bold text-sm`}>
              Current Price: {dogeInfo?.current_price}
            </p>
          </div>
          <div>
            <p className="inline-block font-bold text-sm text-white">
              ATH: {dogeInfo?.ath}
            </p>
          </div>
          <div>
            <p className="inline-block font-bold text-sm text-white">
              24hr High: {dogeInfo?.high_24h}
            </p>
          </div>
          <div>
            <p className="inline-block font-bold text-sm text-white">
              24hr Low: {dogeInfo?.low_24h}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DogecoinBlock;
