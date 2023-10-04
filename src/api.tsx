const BASE_URL = `https://api.coinpaprika.com/v1`

// fetcher ?•¨?ˆ˜
export async function fetchCoins(){
  const response = await fetch(`${BASE_URL}/coins`);
  const json = await response.json();
  return json;

  // then ë°©ì‹
  // return fetch("https://api.coinpaprika.com/v1/coins").then(response => response.json())

}

export async function fetchCoinInfo(coinId: string){
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) => response.json())
}

export async function fetchCoinTickers(coinId: string){
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) => response.json())
}

export function fetchCoinHistory(coinId:string){

  // let endDate = Math.floor(Date.now() / 1000);
  // let startDate = endDate - 60*60*24*7;

  return fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`).then((response) => response.json())
}