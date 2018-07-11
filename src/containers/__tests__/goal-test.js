import React from 'react';
import renderer from 'react-test-renderer';
import { reduxForm } from 'redux-form';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { Goal } from "../goal";

const spy = jest.fn();
const store = createStore(() => ({}));

const Decorated = reduxForm({ form: 'testForm' })(Goal);
describe('Testing that the redux-form matches snapshot', () => {
  it('should render the snapshot', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <Decorated
          handleSubmit={spy}
          submitting={false}
          submit={spy}
        />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

