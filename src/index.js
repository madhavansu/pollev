import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import routes from "./routes.js";
import Header from "./Header";

import protectedRoutes from './protectedRoutes'
import * as firebase from "firebase";
import firebaseConfig from "./firebase.config";

import ProtectedRouteHoc from './ProtectedRouteHoc'
import UnProtectedRouteHoc from './UnProtectedRouteHoc'

import NavigationHeader from './components/NavigationHeader';
import NavigationFooter from "./components/NavigationFooter";

firebase.initializeApp(firebaseConfig);


export const AuthContext = React.createContext(null);
export const PollContext = React.createContext(null);

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentPoll, setCurrentPoll] = useState("");
  
  function readSession() {
    const user = window.sessionStorage.getItem(
			`firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
		);
		if (user) setLoggedIn(true)
  }
  useEffect(() => {
    readSession()
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      <PollContext.Provider value={{currentPoll, setCurrentPoll}}>
        {/* Is logged in? {JSON.stringify(isLoggedIn)} */}
        <div className="App">
          <Router>
            <NavigationHeader isLoggedIn={isLoggedIn} />
            {/* <Header isLoggedIn={isLoggedIn}/> */}
            <Switch>

              {isLoggedIn 
              ? protectedRoutes.map(route => (
                <ProtectedRouteHoc
                  key={route.path}
                  isLoggedIn={isLoggedIn}
                  path={route.path}
                  component={route.main}
                  exact={route.exact}
                  public={route.public}
                />
              )) 
              : routes.map(route => (
                <UnProtectedRouteHoc
                  key={route.path}
                  isLoggedIn={isLoggedIn}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
                  public={route.public}
                />
              ))}
              
              {/* {routes.map(route => (
                <UnProtectedRouteHoc
                  key={route.path}
                  isLoggedIn={isLoggedIn}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
                  public={route.public}
                />
              ))} */}
              
            </Switch>
            <NavigationFooter />
          </Router>
        </div>
      </PollContext.Provider>
    </AuthContext.Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
