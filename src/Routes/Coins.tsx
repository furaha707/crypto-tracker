import { useParams } from "react-router-dom"

interface RouteParams {
  coinId: string;
}

function Coins() {
  const { coinId } = useParams<RouteParams>();
  return (
    <>
    <h1>Coins : {coinId}</h1>
    </>
  )
}

export default Coins