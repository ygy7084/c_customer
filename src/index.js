/* global document, window */
import 'whatwg-fetch';
import 'babel-polyfill';
import Promise from 'promise-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { CookiesProvider } from 'react-cookie';
import store, { history } from './store';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

if (!window.Promise) {
  window.Promise = Promise;
} // Promise explorer 호환
/*
Some components use react-tap-event-plugin to listen for touch events
because onClick is not fast enough
This dependency is temporary and will eventually go away.
Until then, be sure to inject this plugin at the start of your app.
https://www.npmjs.com/package/material-ui
 */
injectTapEventPlugin();
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
