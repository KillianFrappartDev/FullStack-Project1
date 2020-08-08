import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import AuthContext from './Context/auth-context';
import Sidebar from "./Components/Sidebar/Sidebar";
import PageProducts from "./Pages/PageProducts";
import PageAuth from "./Pages/PageAuth";
import PageSell from "./Pages/PageSell";
import PageOrders from "./Pages/PageOrders";
import PageInfo from "./Pages/PageInfo";
import "./App.css";

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

  const loginHandler = (tok, uid, userName) => {
    setIsLogged(true);
    setToken(tok);
    setUserId(uid);
    setUserName(userName);
    console.log("LOGIN " + userName);
    localStorage.setItem("userData", JSON.stringify({userId: uid, token: tok, userName}));
  }

  const logoutHandler = () => {
    setIsLogged(false);
    setToken(null);
    setUserId(null);
    setUserName(null);
    localStorage.removeItem("userData");
  }

  let routes;
  if (isLogged) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <PageProducts />
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
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <PageProducts />
        </Route>
        <Route path="/auth" exact>
          <PageAuth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLogged, token, userId, userName, login: loginHandler, logout: logoutHandler }}
    >
      <Router>
        <Sidebar />
        <div className="main">
            {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
