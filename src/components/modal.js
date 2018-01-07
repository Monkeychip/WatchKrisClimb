import React, { Component } from 'react';
import { reduxForm } from 'redux-form'
//import { Link } from 'react-router';
import * as actions from '../actions';
//import ReactModal from 'react-modal';
const buttonStyle ={
    background: '#FE6627',
    width: '200px',
    height: '50px',
    margin: 'auto',
    borderRadius: '90px' ,
    color: 'white'
};
//authentication URL with my client ID
// To do: add variables into this URLx
//const url = 'https://www.strava.com/oauth/authorize?client_id=21992&response_type=code&state=hideMe&approvalPrompt=force&redirect_uri=http://watchkrisclimb.s3-website.us-east-2.amazonaws.com&state=mystate';
 
class LoginButton extends Component {
	handleFormSubmit(){
		console.log("I was submitted");
	}
 render () {

    return (
    	<form >
    		<button action="submit" className="ui huge button" style={buttonStyle}>Authorize</button>
 		</form> 	
    );
  }
}

export default reduxForm({
	form: 'loginbutton'
},null,actions)(LoginButton);


//export default LoginButton;



/*<div><a href={url}>Try it out yourself</a></div>*/





/*
const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : '#29303a',
  },
  content : {
    position                   : 'absolute',
    top                        : '40px',
    left                       : '40px',
    right                      : '40px',
    bottom                     : '40px',
    border                     : '1px solid #ccc',
    background                 : '#FE6627',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px',
    width: '50%',
    height: '50%',
    margin: 'auto'

  }
};
const buttonStyle ={
	border                     : '1px solid #ccc',
    background                 : '#FE6627',
    width: '200px',
    height: '100px',
    margin: 'auto'
};

class ExampleModal extends Component {
  constructor () {
    super();
    this.state = {
      showModal: false
    };
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }
  
  render () {
    return (
      <div>
        <button onClick={this.handleOpenModal}>Try it out yourself?</button>
        <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="Authentication Modal"
           style={customStyles}
        >
          <button onClick={this.handleCloseModal} style={buttonStyle}>Close Modal</button>
        </ReactModal>
      </div>
    );
  }
}


export default ExampleModal;
*/
/*
Redirect to this URL:
https://www.strava.com/oauth/authorize?client_id=21992&response_type=code&state=hideMe&approvalPrompt=force&redirect_uri=http://watchkrisclimb.s3-website.us-east-2.amazonaws.com
*/