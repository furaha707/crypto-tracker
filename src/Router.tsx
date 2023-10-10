import { BrowserRouter, Switch, Route } from "react-router-dom"
import Coin from "./Routes/Coin"
import Coins from "./Routes/Coins"

interface IRouterProps {
  toggleDark: () => void;
  isDark: boolean;
}

function Router({toggleDark, isDark}: IRouterProps){
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Coin toggleDark={toggleDark} />
        </Route>
        <Route path="/:coinId">
          <Coins isDark={isDark} />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router