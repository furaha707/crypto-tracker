import { useEffect, useState } from "react";
import { Link, Route, Switch, useHistory, useLocation, useParams, useRouteMatch } from "react-router-dom"
import styled from "styled-components"
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Interface } from "readline";
import { Helmet } from "react-helmet";


interface RouteParams {
  coinId: string;
}

const Container = styled.div`
  padding: 0px 20px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  text-align:center;
` 

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ $isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) => 
    props.$isActive ? props.theme.accentColor : props.theme.textColor
  };
  a {
    display: block;
  }
`;

const Overview = styled.div`
  display:flex;
  justify-content: space-between;
  background-color: rgba(0,0,0,0.5);
  padding: 10px 20px;
  border-radius:10px;
`
const OverviewItem = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  span:first-child{
    font-size:10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom:5px;
  }
`

const Description = styled.p`
  margin: 20px 0;
`

interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id:string;
  name:string;
  symbol:string;
  rank:number;
  circulating_supply:number;
  total_supply:number;
  max_supply:number;
  beta_value:number;
  first_data_at:string;
  last_updated:string;
  quotes:{
    USD: {
      "price": number,
      "volume_24h": number,
      "volume_24h_change_24h": number,
      "market_cap": number,
      "market_cap_change_24h": number,
      "percent_change_15m": number,
      "percent_change_30m": number,
      "percent_change_1h": number,
      "percent_change_6h": number,
      "percent_change_12h": number,
      "percent_change_24h": number,
      "percent_change_7d": number,
      "percent_change_30d": number,
      "percent_change_1y": number,
      "ath_price": number,
      "ath_date": string,
      "percent_from_price_ath": number,
    }
  };
}

interface ICoinProps {
  isDark: boolean;
}

function Coins({isDark}: ICoinProps) {
  const { coinId } = useParams<RouteParams>();
  // const [loading, setLoading] = useState(true);
  const { state } = useLocation<RouteState>();
  // const [info, setInfo] = useState<InfoData | null>();
  // const [priceInfo, setPriceInfo] = useState<PriceData | null>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const {isLoading: infoLoading, data: infoData} = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId))
  const {isLoading: tickersLoading, data: tickerData} = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId))
// 세번째 인자에 refetchInterval 옵션 추가했는데, api 횟수 제한 때문에 지워둠

  // useEffect(()=>{
  //   (async () => {
  //     const infoData = await ( await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setLoading(false);
  //     console.log(info);
  //     console.log(priceInfo);
  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //   })();
  // },[])

  // 뒤로가기 버튼
  const history = useHistory();

  // 페이지가 로드될 때 실행되는 useEffect
  useEffect(() => {
    // 뒤로가기 버튼을 눌렀을 때 홈 페이지로 이동
    const handleGoBack = () => {
      history.push('/');
    };

    // 브라우저의 뒤로가기 이벤트를 감지하여 홈 페이지로 이동
    window.addEventListener('popstate', handleGoBack);

    // 컴포넌트가 unmount 될 때 이벤트 리스너를 정리
    return () => {
      window.removeEventListener('popstate', handleGoBack);
    };
  }, [history]);

  const loading = infoLoading || tickersLoading;
  return (
    <Container>
    <Helmet>
      <title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</title>
    </Helmet>
    <Header>
      <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
      
    </Header>
    {
      loading ? ( <Loader>Loading...</Loader> ) : 
      (
        <>
        <Overview>
          <OverviewItem>
            <span>Rank:</span>
            <span>{infoData?.rank}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Symbol:</span>
            <span>${infoData?.symbol}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Price:</span>
            <span>{tickerData?.quotes.USD.price}</span>
          </OverviewItem>
        </Overview>
        <Description>{infoData?.description}</Description>
        <Overview>
          <OverviewItem>
            <span>Total Supply:</span>
            <span>{tickerData?.total_supply}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Max Supply:</span>
            <span>{tickerData?.max_supply}</span>
          </OverviewItem>
        </Overview>
        
        <Tabs>
          <Tab $isActive={priceMatch !== null}>
           <Link to={`/${coinId}/price`}>
              Price
            </Link>
          </Tab>
          <Tab $isActive={chartMatch !== null}>
           <Link to={`/${coinId}/chart`}>
              Chart
            </Link>
          </Tab>
        </Tabs>
        
        <Switch>
          <Route path={`/${coinId}/price`}>
            <Price coinId={coinId} />
          </Route>
          <Route path={`/${coinId}/chart`}>
            <Chart isDark={isDark} coinId={coinId} />
          </Route>
        </Switch>
      </>
      )
      } 
      </Container>
  )
}

export default Coins