import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";

import store from "./store";
import { getTrackers } from "./actions/index";

store.dispatch(getTrackers());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , 
  document.getElementById("root")
);

