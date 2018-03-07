import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // local storage so stays in browserscache
import { Router, Route, browserHistory } from 'react-router';
//browserHistory what the router should do to keep track of current URL...

import App from './components/App'; 
import About from './components/about';
import Menu from './components/menu';
import Table from './components/table';
import { store, persistor } from './reduxStore';

require('dotenv').config();

class Index extends Component {

	render() {
		return (
			 <Provider store={store}>
  				<PersistGate loading={null} persistor={persistor}>
  					<Router history={browserHistory}>
  	  					<Route path="/" component={ App }> </Route>
  	  					<Route path="/about" components= { About }></Route>
  	  					<Route path="/table" components= { Table }></Route>
  	 				</Router>
  				</PersistGate>
 			 </Provider>
		)
	}
}

ReactDOM.render(React.createElement(Index, null),
	document.querySelector('.container')
);


 //