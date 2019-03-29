import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

function render(Component) {
  ReactDOM.hydrate(
    <BrowserRouter>
      <Component />
    </BrowserRouter>,
    document.getElementById('root'),
  );
}

render(App);
