import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import { createStore, applyMiddleware } from 'redux'; 
import reduxPromise from 'redux-promise'; 
import { Router, Route, IndexRoute, browserHistory } from 'react-router'; 

import App from './components/App'; 
import reduxThunk from 'redux-thunk';
import reducers from './reducers';


//store is where you story your Application state, by passing in reducers, which handle change that comes in from actions
const createStoreWithMiddleware = applyMiddleware(reduxPromise, reduxThunk)(createStore); 

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  	<Router history={browserHistory}>
  	  <Route path ="/" component={ App } >
  	  </Route>
  	 </Router>
  </Provider>
  , document.querySelector('.container'));


  