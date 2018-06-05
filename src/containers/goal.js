import React from 'react';
import { Component } from 'react';
import { Field, reduxForm} from 'redux-form';


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
