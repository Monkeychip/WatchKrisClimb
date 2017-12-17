import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import { createStore, applyMiddleware } from 'redux'; 
import reduxPromise from 'redux-promise'; 

import App from './App'; 
import reducers from './reducers'; 
import './index.css';

const createStoreWithMiddleware = applyMiddleware(reduxPromise)(createStore); 

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<App />
	</Provider>
	, document.querySelector('#app')
);


  