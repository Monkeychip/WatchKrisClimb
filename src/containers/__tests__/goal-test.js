import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Goal } from "../goal";

Enzyme.configure({adapter: new Adapter()});

test("goal renders correctly", () => {
  const component = shallow(<Goal />)
  expect(component).toMatchSnapshot();
});

