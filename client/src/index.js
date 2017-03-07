import './style/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store.js';
import CoreRouter from 'src/routes';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <CoreRouter />
    </Provider>,
    document.getElementById('root')
);
