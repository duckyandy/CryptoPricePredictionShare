import React, { useState, ChangeEvent, useEffect } from "react";
import BitcoinBlock from "./components/BitcoinBlock";
import DogecoinBlock from "./components/DogeBlock";
import EthereumBlock from "./components/EthereumBlock";

import Header from "./components/Header";
import MaticBlock from "./components/MaticBlock";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Axios from "axios";
import { CryptoChoose4, ICryptoPrediction } from "../typings";

import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { AnyCnameRecord } from "dns";

function App() {
  const [numBettingCoins, setNumBettingCoins] = useState<number>(0);
  const [coinName, setCoinName] = useState<CryptoChoose4>("BTC");
  const [coinPrediction, setCoinPrediction] = useState<String>("");
  const [predictionList, setPredictionList] = useState<ICryptoPrediction[]>([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((result) => {
      setPredictionList(result.data);
    });
  }, []);

  const handleInsertCoin = () => {
    setNumBettingCoins(numBettingCoins + 10);
  };

  const handleCoinName = (e: SelectChangeEvent) => {
    setCoinName(e.target.value as CryptoChoose4);
  };

  const handleCoinPrediction = (e: React.FormEvent<HTMLInputElement>) => {
    setCoinPrediction(e.currentTarget.value as string);
  };

  const submitCoinPrediction = () => {
    Axios.post("http://localhost:3001/api/insert", {
      coinName: coinName,
      coinPrediction: coinPrediction,
    }).then(() => {
      setPredictionList([
        ...predictionList,
        { coin: coinName, predictionComment: coinPrediction },
      ]);
    });
  };

  const deleteCoinPrediction = (ID: String) => {
    Axios.delete(`http://localhost:3001/api/delete/${ID}`, {
      headers: { "Content-Type": "application/json" },
    });
  };

  const renderCoinLogo = (crypto: CryptoChoose4) => {
    if (crypto === "BTC") {
      return <img src="/assets/btc.png" width="20" height="20" />;
    }
    if (crypto === "ETH") {
      return <img src="/assets/eth.png" width="20" height="20" />;
    }
    if (crypto === "DOGE") {
      return <img src="/assets/doge.png" width="20" height="20" />;
    }
    if (crypto === "MATIC") {
      return <img src="/assets/matic.png" width="20" height="20" />;
    }
  };

  return (
    <div>
      <Header />
      <div className="flex">
        <div className="w-[50%]">
          <BitcoinBlock />
          <EthereumBlock />
          <DogecoinBlock />
          <MaticBlock />
        </div>
        <div className="flex-col mt-5">
          <div className="ml-10 space-y-5">
            <h1 className="font-mono font-bold">Betting Coin Machine</h1>
            <button
              onClick={handleInsertCoin}
              className="rounded font-bold bg-slate-300"
            >
              Insert
            </button>
          </div>
          <p className="mt-5 ml-5 font-bold">
            # of Betting Coins: {numBettingCoins}
          </p>
          <div>
            <form className="mt-5 ml-1">
              <FormControl className="w-[100px]">
                <InputLabel id="coin-select-label">Coin</InputLabel>
                <Select
                  labelId="coin-selection-label"
                  id="coin-select"
                  value={coinName}
                  label="Coin"
                  onChange={handleCoinName}
                >
                  <MenuItem value={"BTC"}>BTC</MenuItem>
                  <MenuItem value={"ETH"}>ETH</MenuItem>
                  <MenuItem value={"DOGE"}>DOGE</MenuItem>
                  <MenuItem value={"MATIC"}>MATIC</MenuItem>
                </Select>
              </FormControl>
              <input
                className="border-2 w-[400px] h-[150px]"
                type="text"
                placeholder="Share Predictions"
                onChange={handleCoinPrediction}
              />
              <div>
                <button
                  className="font-bold border-2 rounded-md bg-slate-400"
                  onClick={submitCoinPrediction}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          <div>
            {predictionList.map((element, index) => {
              return (
                <div
                  key={index}
                  className="relative flex bg-[#f7cad2] mx-5 mt-2 rounded-sm text-white font-semibold gap-x-2"
                >
                  {renderCoinLogo(element.coin as CryptoChoose4)}
                  <div>
                    <p>{element.predictionComment}</p>
                  </div>

                  {(element.predictionComment || element.coin) && (
                    <button
                      className="absolute right-3"
                      onClick={() => {
                        deleteCoinPrediction(element.predictionComment);
                        console.log(
                          `element predictioncomment: ${element.predictionComment}`
                        );
                      }}
                    >
                      <XCircleIcon className="h-4 w-4 text-red-700" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
