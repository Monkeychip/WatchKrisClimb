import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Table } from '../table';

Enzyme.configure({adapter: new Adapter()});

test("table renders correctly", () => {
  //const component = shallow(<Table />)
 //expect(component).toMatchSnapshot();
});

