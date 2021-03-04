import React, { useEffect } from "react";

import "./App.css";
import Dashboard from "./components/DashboardComponent/Dashboard";
import Login from "./components/LoginComponent/Login";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Protectedroute from "./components/ProtectedrouteComponent/Protectedroute";
import { useDispatch } from "react-redux";
import { setLoggedUser } from "./features/counter/appSlice";

function App() {
  const dispatch = useDispatch();
  const loadStateFromLocalStorage = () => {
    try {
      const localStorageState = localStorage.getItem("Token");
      if (localStorageState === null) {
        return undefined;
      }
      return localStorageState;
    } catch (e) {
      return undefined;
    }
  };
  useEffect(() => {
    console.log("loaded from local", loadStateFromLocalStorage());
    let localStorageState = loadStateFromLocalStorage();
    if (localStorageState !== undefined) {
      console.log("setting from storage");
      dispatch(setLoggedUser(localStorageState));
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/account/login" />
          </Route>
          <Route path="/account/login" component={Login} />
          <Protectedroute
            exact={true}
            path="/account/data"
            component={Dashboard}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
