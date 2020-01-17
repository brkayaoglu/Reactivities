import React from "react";
import ReactDOM from "react-dom";
import "./App/Layout/styles.css";
import App from "./App/Layout/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import ScrollComponent from "./App/Layout/scrollComponent/ScrollComponent";

ReactDOM.render(
  <BrowserRouter>
    <ScrollComponent>
      <App />
    </ScrollComponent>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
