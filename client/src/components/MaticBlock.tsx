import { useEffect, useState } from "react";
import requests from "../utils/requests";
import axios from "axios";
import { CryptoData } from "../../typings";

function MaticBlock() {
  const [maticInfo, setMaticInfo] = useState<CryptoData | null>(null);

  useEffect(() => {
    async function fetchCryptoData() {
      const data = await axios
        .get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        )
        .then((response) => response.data);

      if (data) {
        // const bitcoinIndex = data[0].id;
        const maticIndex = data.findIndex(
          (element: CryptoData) => element.id === "bitcoin"
        );
        setMaticInfo(data[maticIndex]);
      }
    }
    fetchCryptoData();
  }, []);

  return (
    <div>
      <div className="flex bg-gradient-to-r from-[#67a669] to-[#94e79e] py-10 pl-10 space-x-10">
        <div className="transition hover:scale-150 hover:ease-in ease-out duration-200">
          <img src="/assets/matic.png" width="60" height="60" />
        </div>

        <div className="flex-col">
          <div>
            <p className={`inline-block font-bold text-sm`}>
              Current Price: {maticInfo?.current_price}
            </p>
          </div>
          <div>
            <p className="inline-block font-bold text-sm text-white">
              ATH: {maticInfo?.ath}
            </p>
          </div>
          <div>
            <p className="inline-block font-bold text-sm text-white">
              24hr High: {maticInfo?.high_24h}
            </p>
          </div>
          <div>
            <p className="inline-block font-bold text-sm text-white">
              24hr Low: {maticInfo?.low_24h}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaticBlock;
