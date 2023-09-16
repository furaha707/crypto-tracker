import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import styled from "styled-components"

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
  
}

function Coins() {
  const { coinId } = useParams<RouteParams>();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState<InfoData | null>();
  const [priceInfo, setPriceInfo] = useState({});

  useEffect(()=>{
    (async () => {
      const infoData = await ( await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      console.log(infoData);
      console.log(priceData);
      setInfo(infoData);
      setPriceInfo(priceData);
    })();
  },[])

  console.log(state.name);
  return (
    <Container>
    <Header>
      <Title>{state?.name || "Loading"}</Title>
    </Header>
    {
      loading ? 
      <Loader>Loading...</Loader> : 
      <span>{info.is_new}</span>} 
      </Container>
  )
}

export default Coins