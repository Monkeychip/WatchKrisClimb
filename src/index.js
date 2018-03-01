import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import { PersistGate } from 'redux-persist/integration/react';
import { Router, Route, browserHistory } from 'react-router';

import App from './components/App'; 
import About from './components/about';
import Menu from './components/menu';
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
  	 				</Router>
  				</PersistGate>
 			 </Provider>
		)
	}
}

ReactDOM.render(React.createElement(Index, null),
	document.querySelector('.container')
);
/*ReactDOM.render(
  //<Provider store={createStoreWithMiddleware(reducers)}>
  <Provider store={store}>
  	<PersistGate loading={null} persistor={persistor}>
  		<Router history={browserHistory}>
  	  		<Route path="/" component={ App }> </Route>
  	  		<Route path="/about" components= { About }></Route>
  	 	</Router>
  	</PersistGate>
  </Provider>
  , document.querySelector('.container'));
*/

  