import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions_index'; 
import { CALLBACK_URI } from '../actions/types';
import logo_124_124 from '../../build/assets/images/logo_124_124.png';
import { Link } from 'react-router'


class Menu extends Component {
	constructor(props){
		super(props);
		this.state = {isLoggedIn: false}; //initial state to not logged in
		this.handleClick = this.handleClick.bind(this);
	}

	//Everytime the component mounts check if there is a code in the URL
	componentDidMount(){
		let code = new URL(window.location.href).searchParams.get('code');
		//If there is no code in the URL fetch your data for an example
		if(!code){
			this.props.fetchActivities();
			this.setState({isLoggedIn: false});	
		}else{
			//If there is a code in the URL fetch Activities with the code and change text and color
			this.props.fetchActivitiesWithCode();
			this.setState({
				isLoggedIn: true,
				code: code
			});	
		};
	}
	handleClick(){
		window.location.href = `https://www.strava.com/oauth/authorize?client_id=21992&response_type=code&redirect_uri=http://${CALLBACK_URI}`
	}
	handleLogOut(){
	    window.location.href = `http://www.winteredition.io`;	   
	}

	render(){
		
		let button = null,
		    isLoggedIn = this.state.isLoggedIn,
		    isCode = this.state.code,
		    pathHome = (isCode) ?`/?state=&code=${isCode}` : '/';

		    //problem I need to persist the code even on refresh.  x
		if(isLoggedIn){
			button = <div
			  	 className="ui button" 
			  	 id="buttonLogOut"
			  	 onClick={this.handleLogOut}>Log-out
			  	</div>
		} else {
			button = <div
			  	 className="ui button" 
			  	 ref='buttonTextLogIn'
			  	 onClick={this.handleClick}>Log-in
			  	</div>
		}
		
		return(
			<div className="ui four item menu">
			    <div className="item" id="home-logo"> 
    				<Link to={pathHome} className="item"><img src={logo_124_124} alt=""></img> </Link>
  				</div>
			  <Link className="item ag-flex-start" to="/about">How to use</Link> 
			  <a className="item ag-flex-start">More Stats</a>
			  <div className="item">
			   <div isLoggedIn={isLoggedIn}>{button}</div> {/*getting error here on the isLoggedInProperty on the div tag*/}
			  </div>
			  
			</div>
		)
	}
}

export default connect(null,actions)(Menu);