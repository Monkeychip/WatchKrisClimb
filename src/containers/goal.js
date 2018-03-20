import React from 'react';
import { Component } from 'react';
import { Field, reduxForm} from 'redux-form';  //reduxForm is like a connect middleware

/*
From SG:
- Redux Form is in charge of form called "Goal"
- You need to keep track of the name="number"
- Redux Form takes info and manages them. 
- Set rules for each field.  We need to tell the form that it's being managed by redux-form.
- It will then pass back properties to us.  Make sure that number knows a set of rules via props.  handleSubmit call, fields.number, pass directly to JSX tags.
- fields.number and pass to the input.
- When the form is submitted, call handleSubmit function that comes from redux-form.  
- Use handleSubmit function with action creator, which will handle the data from there.
*/

//{..input} destructing, pass object into input, turns out to be this.props.input, passing into input object. onChange={input.onChange} :/
const renderField = ({ input, type }) => (
  <div className="ui right labeled input">
    <input {...input} className="two wide field" placeholder="50,000 ft" type={type} max={2000000}/> 
  </div>
)

class Goal extends Component {


  render(){
    const { handleSubmit } = this.props; //pass in action creator, so that whenever it's submitted, it saves to local storage via action creator.
    return (
      <form onSubmit={handleSubmit} size='large' key='large'>  
        <div className="field">
          <div id="elevation-label">
              <label>Enter Elevation Goal for the Year:</label> 
          </div>
                  <div className="ui right labeled input" >
                      <Field
                          name="number"                  
                          type="number"
                          component={renderField}
                      />
                      <div className="ui basic label" id="fix-ft-label">ft</div>
                  </div>
        </div>
            <button type="submit" id="submit-button" className="ui inverted blue button ">Show Goal</button>
      </form>
    )
  }
}



Goal = reduxForm({
  form: 'goal',
})(Goal);

export default Goal;
//export default Goal = connect(null, {fetchGoal})(Goal);

//on click I need to somehow make activities Chart check it's value and reload.