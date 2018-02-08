import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions_index'; 
import { Button, Form } from 'semantic-ui-react'

//potential to change this to a const, but doing in component first in case need to change state
class Goal extends Component {
 render(){
  return(
    <Form size='large'key ='large'>
    <Form.Field>
      <label>Enter Elevation Goal for the year</label>
      <input type='number' max={2000000} placeholder="50,000 ft" width={2}  />
    </Form.Field>
    <Button type='submit'>Submit</Button>
    </Form>
  )
 }
}

export default Goal