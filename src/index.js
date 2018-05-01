import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import { PersistGate } from 'redux-persist/integration/react';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App'; 
import About from './components/about';
import Table from './components/table';
import { store, persistor } from './reduxStore';

require('dotenv').config();

class Dashboard extends Component {

	render() {
		return (
			 <Provider store={store}>
  				<PersistGate loading={null} persistor={persistor}>
  					<Router history={browserHistory}>
  	  					<Route path="/" component={ App }> </Route>
  	  					<Route path="/about" components={ About }></Route>
  	  					<Route path="/table" components={ Table }></Route>
  	 				</Router>
  				</PersistGate>
 			 </Provider>
		)
	}
}

ReactDOM.render(React.createElement(Dashboard, null),
	document.querySelector('.container')
);


 