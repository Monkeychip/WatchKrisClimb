import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form'; 
//import { fetchGoal } from '../actions/actions_index';
import * as actions from '../actions/actions_index';

const renderInput = field => (
    <div>
        <input {...field.input} type={field.type}/>
        {
            field.meta.touched &&
            field.meta.error &&
            <span className="error">{field.meta.error}</span>
        }
    </div>);


class Signin extends Component {

	handleFormSubmit({number}){
		console.log(number,"here");
		this.props.fetchGoal(number);
	}

  render(){
  	const {handleSubmit} = this.props //handle submit comes from redux form.. might have issue here

  		return(
  			<form
                className="ui form"
                onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
                size='large' key='large'>
            
                <div className="field">
                    <label>Enter Elevation Goal for the Year:</label>
                    <div className="ui right labeled input">
	                    <Field
	                        name="number"                   
	                        component={renderInput}        
	                        type="number"  
	                        max={2000000} 
	                        placeholder="50,000 ft"
	                    />
	                    <div className="ui basic label" id="fix-ft-label">
					      		ft
					    </div>
                    </div>
                </div>
                <button action="submit" className="ui inverted blue button ">
                    Submit
                </button>
            </form>
  		)

	}
}

export default reduxForm({
    form: 'signin'    // no fields array given
})(
    connect(null, actions)(Signin)
);

