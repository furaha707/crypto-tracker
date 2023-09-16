import styled from "styled-components"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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

const CoinsList = styled.ul`
  
`

const Coins = styled.li`
  background-color: white;
  color: ${props => props.theme.accentColor};
  margin-bottom: 20px;
  a{
    padding: 20px;
    display:flex;
    align-items: center;
  }
  &:hover{
    a{
      background-color:${(props) => props.theme.accentColor};
      color: white;
    }
  }
`

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`

const Loader = styled.div`
  text-align:center;
` 

const Img = styled.img`
  width:25px;
  height:25px;
`

interface CoinInterface{
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string
}

function Coin() {

  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async() => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json()
      setCoins(json.slice(0,100));
      setLoading(false);
  })();
//   (() => {
//     console.log('마운트될때')
// })();
    
  },[])

  // console.log('a')


  return (
    <Container>
      <Header>
        <Title>Coin</Title>
      </Header>
      {loading ? 
      <Loader>Loading...
        </Loader> : 
            <CoinsList>
            {coins.map(coin => 
            <Coins key={coin.id}>
              <Link to={{
                pathname: `/${coin.id}`,
                state: {name: coin.name}
              }}>
                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt={coin.name}/>
                {coin.name} &rarr;
              </Link>
            </Coins>)
            }
          </CoinsList>
      }

    </Container>
  )
}

export default Coin