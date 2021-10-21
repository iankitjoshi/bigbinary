import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import Dashboard from "./Component/Dashboard";
import NotFound from "./Component/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
