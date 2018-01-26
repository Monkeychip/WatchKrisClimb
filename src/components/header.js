import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions_index'; 
import { CALLBACK_URI } from '../actions/types'; 

class Header extends Component {
	componentDidMount() {

	
    let code = new URL(window.location.href).searchParams.get('code')
    if(!code){
    	this.props.fetchActivities();
    }else{
    	this.props.fetchActivitiesWithCode();
    };
    	

    }
	render() {
    	return <button id="authenticate-button" className="ui-button" onClick={this.handleClick.bind(this)}>Try it out</button>
  	}
  	handleClick() {
    	window.location.href = `https://www.strava.com/oauth/authorize?client_id=21992&response_type=code&redirect_uri=http://${CALLBACK_URI}`;
    }

}

export default connect(null,actions)(Header);

