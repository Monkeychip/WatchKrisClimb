import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/actions_index'; 


class Header extends Component {
	authButton(){
		return <button onClick={()=> this.props.fetchMessage()}>Authenticate with Strava</button>; //signinUser comes from the action creator
	}	
	
	render() {
		return(
			<div class="ui three item menu">
			  <a class="item">{this.authButton()}</a>
			</div>
		);
	}

}

function mapStateToProps(state){ 
	return { authenticated: state.authenticated };
}

export default connect(mapStateToProps, actions)(Header);


