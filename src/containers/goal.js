import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { Field, reduxForm} from 'redux-form'; 
import * as actions from '../actions/actions_index';


let Goal = props => {

  const { handleSubmit } = props

  const formatter = {
    number: value => value ? (+value).toLocaleString() : ''
  };

  const parser = {
    number: value => value ? (value.match(/\d+/g) || []).join('') : ''
  };

  return (
    <form onSubmit={handleSubmit} size='large' key='large'>
		<div className="field">
          <div id="elevation-label"><label>Enter Elevation Goal for the Year:</label></div>

                <div className="ui right labeled input" >
                    <Field
                        name="number"                   
                        type="number"
                        max={2000000} 
                        placeholder="50,000 ft"
                        component="input"
                       	className="two wide field"
                    />
                    <div className="ui basic label" id="fix-ft-label">
				      		ft
				    </div>
                </div>
          </div>
          <button type="submit" id="submit-button" className="ui inverted blue button ">
            Show Goal
          </button>
    </form>
  )
}

Goal = reduxForm({
  form: 'goal'
})(Goal)

export default Goal

