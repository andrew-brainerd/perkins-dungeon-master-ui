import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import { Provider } from 'react-redux';
import configureStore, { history } from './store/configureStore';
import * as serviceWorker from './serviceWorker';
import App from './components/App/App';
import './index.scss';

console.log(
  `%cPerkins DM App v${process.env.REACT_APP_VERSION}`,
  'color: #00fcfe; font-size: 20px;'
);

WebFont.load({
  google: {
    families: [
      'Inconsolata: 400',
      'Roboto Mono: 400'
    ]
  }
});

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
