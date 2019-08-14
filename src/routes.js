import React from "react";
import Login from "./Login";
import CreateOpenPollScreen from "./components/CreateOpenPollScreen";
import PollList from "./components/PollList";

const routes = [
  { name: "CreateOpenPollScreen", path: "/", exact: true, main: props => <CreateOpenPollScreen {...props} />, public: true },
  { name: "Login", path: "/login", exact: true, main: props => <Login {...props} /> },
  { name: "PollList", path: "/polllist", exact: true, main: props => <PollList {...props} /> }
];

export default routes;