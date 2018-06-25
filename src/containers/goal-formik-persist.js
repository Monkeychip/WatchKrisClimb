import React from 'react';
import { withFormik, Field, Form } from 'formik';
//import { Persist } from 'formik-persist';
import Yup from 'yup';


const GoalPersist = ({values, isSubmitting, handleSubmit}) => (

            <Form onSubmit={handleSubmit}>
                <div className="field">
                    <div id="elevation-label">
                        <label>Enter Elevation Goal for the Year:</label>
                    </div>
                    <div className="ui right labeled input">
                        { /*values.number && <p>{errors.number}</p> */}

                        <Field
                            type="number"
                            name="number"
                            placeholder="50,000 ft"
                        />
                        <div className="ui basic label" id="fix-ft-label">ft</div>
                    </div>
                </div>
                    <button type="submit" id="submit-button" className="ui inverted blue button" disabled={isSubmitting}>Show Goal</button>
            </Form>
)


const FormikApp = withFormik({
  /*mapPropsToValues allows you to setup default values.
  Makes values available using props.values.number*/
  mapPropsToValues( { number }) {
      return {
          number: number || 0
        };
  },
  validationSchema: Yup.object().shape({
    //number: Yup.number().required().positive().integer().max(3000000,"Must be a reasonable number")
    number: Yup.number()
  }),
  handleSubmit(values, { resetForm, setSubmitting }) {
    //setSubmitting(false);
      setTimeout(() => {
          resetForm(),
        setSubmitting(false)
      },2000)

    
  }
})(GoalPersist);

export default FormikApp;
