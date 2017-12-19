import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import { createStore, applyMiddleware } from 'redux'; 
import reduxPromise from 'redux-promise'; 

import App from './App'; 
import reducers from './reducers'; 
import './index.css';

const createStoreWithMiddleware = applyMiddleware(reduxPromise)(createStore); 
//reactDom is needed to interact with actual dom.  React works with components
ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<App />
	</Provider>
	, document.querySelector('#app')
);


  