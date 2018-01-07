import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import { createStore, applyMiddleware } from 'redux'; 
import reduxPromise from 'redux-promise'; 
import { Router, Route, IndexRoute, browserHistory } from 'react-router'; 

import App from './components/App'; 
import Modal from './components/modal'; 
import reducers from './reducers'; 
import './index.css';
import reduxThunk from 'redux-thunk';



const createStoreWithMiddleware = applyMiddleware(reduxPromise, reduxThunk)(createStore); 

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  	<Router history={browserHistory}>
  	  <Route path ="/" component={ App } >
  	  </Route>
  	 </Router>
  </Provider>
  , document.querySelector('.container'));


  