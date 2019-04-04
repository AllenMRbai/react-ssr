import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { hot } from "react-hot-loader/root";

import App from "./App";
import { createStoreMap } from "./store";

const store = createStoreMap();
const HotApp = hot(App);

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
