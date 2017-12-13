import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; //added
import { createStore, applyMiddleware } from 'redux'; //added
import reduxPromise from 'redux-promise'; //added and node added no problems

import App from './App'; //I do not have a components folder which is where the other points to
import reducers from './reducers'; //added
import './index.css';

const createStoreWithMiddleware = applyMiddleware(reduxPromise)(createStore); //added?

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<App />
	</Provider>
	, document.querySelector('#app')
);
//OLD
  /*<App />,
  document.getElementById('root')*/

  