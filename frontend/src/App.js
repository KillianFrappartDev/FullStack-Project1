import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  BrowserRouter,
} from "react-router-dom";

import Sidebar from "./Components/Sidebar/Sidebar";
import PageProducts from "./Pages/PageProducts";
import PageAuth from "./Pages/PageAuth";
import PageSell from "./Pages/PageSell";
import PageOrders from "./Pages/PageOrders";
import PageInfo from "./Pages/PageInfo";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Sidebar />
      <div className="main">
        <Switch>
          <Route path="/" exact>
            <PageProducts />
          </Route>
          <Route path="/auth" exact>
            <PageAuth />
          </Route>
          <Route path="/profile/info" exact>
            <PageInfo />
          </Route>
          <Route path="/profile/orders" exact>
            <PageOrders />
          </Route>
          <Route path="/profile/products" exact>
            <PageSell />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
