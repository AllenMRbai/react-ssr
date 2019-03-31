import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";

import App from "./App";
import appState from "./store/app.store";

function render(Component) {
  ReactDOM.hydrate(
    <Provider appState={appState}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
}

render(App);
