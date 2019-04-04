import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";

import { HotApp } from "./App";
import { AppState } from "./store";

const initialStore = window.__INITIAL_STORE__ || {}; // eslint-disable-line

const store = new AppState(initialStore.appStore);

if (process.env.NODE_ENV === "development") {
  import("mobx-devtools-mst").then(({ default: makeInspectable }) => {
    console.log("mobx dev tool加载成功");
    makeInspectable(store);
  });
}

function render(Component) {
  ReactDOM.hydrate(
    <Provider appState={store}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
}

render(HotApp);
