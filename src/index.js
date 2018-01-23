import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import { createStore, applyMiddleware } from 'redux'; 
import reduxPromise from 'redux-promise'; 
import { Router, Route, browserHistory } from 'react-router';

import App from './components/App'; 
import reduxThunk from 'redux-thunk';
import reducers from './reducers';


require('dotenv').config();

const createStoreWithMiddleware = applyMiddleware(reduxPromise, reduxThunk)(createStore); 

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  	<Router history={browserHistory}>
  	  <Route path="/" component={ App }> 
  	  		<Route path="signin"></Route>
  	  </Route>
  	 </Router>
  </Provider>
  , document.querySelector('.container'));


  