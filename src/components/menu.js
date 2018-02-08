import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions_index'; 
import { CALLBACK_URI } from '../actions/types';
import logo_124_124 from '../../build/assets/images/logo_124_124.png'


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
			this.setState({isLoggedIn: true});	
		};
	}
	handleClick(){
		window.location.href = `https://www.strava.com/oauth/authorize?client_id=21992&response_type=code&redirect_uri=http://${CALLBACK_URI}`
		this.refs.buttonText.style.backgroundColor = '#888590';
		
	}
	handleLogOut(){
	    window.location.href = `http://www.winteredition.io`;	
	    
	}

	render(){
		let button = null;
		let isLoggedIn = this.state.isLoggedIn;
		
		if(isLoggedIn){
			button = <div
			  	 className="ui button" 
			  	 ref='buttonText'
			  	 onClick={this.handleLogOut}>Log-out
			  	</div>
		} else {
			button = <div
			  	 className="ui button" 
			  	 ref='buttonText'
			  	 onClick={this.handleClick}>Log-in
			  	</div>
		}
		
		return(
			<div className="ui menu">
			    <div className="item" id="home-logo"> 
    				<img src={logo_124_124}></img> {/*Make click on home using router and change potentially*/}
			   
  				</div>
			  <a className="item">How to use</a> 
			  <a className="item">More Stats</a>
			  <div className="item">
			   <div isLoggedIn={isLoggedIn}>{button}</div>
			  </div>
			  
			</div>
		)
	}
}

export default connect(null,actions)(Menu);