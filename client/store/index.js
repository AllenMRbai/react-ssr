import AppState from "./app.store";

function createStoreMap() {
  return {
    appState: new AppState()
  };
}

export { AppState, createStoreMap };
