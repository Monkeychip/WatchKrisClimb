import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { routerActions } from 'react-router-redux';
import { connect } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';  


/*START PASSPORT WORK*/


const buttonStyle ={
    background: '#FE6627',
    width: '200px',
    height: '50px',
    margin: 'auto',
    borderRadius: '90px' ,
    color: 'white'
};

const url = 'https://www.strava.com/oauth/authorize?client_id=21992&response_type=code&state=hideMe&approvalPrompt=force&redirect_uri=http://watchkrisclimb.s3-website.us-east-2.amazonaws.com&state=mystate';



const redirectToStravaAuth = () => {  
   window.location.href = url;
};




class LoginButton extends Component {

 render () {
 	return (
    	<button onClick={ redirectToStravaAuth } className="ui huge button" style={buttonStyle}>Authorize</button>
 	);
  }
}

export default LoginButton;
//export default connect(null, actions)(LoginButton);
