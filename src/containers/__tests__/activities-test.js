import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Activities } from "../activities";

Enzyme.configure({ adapter: new Adapter() });

test("Activities can process and return input", () => {
  //const component = shallow(<Activities thisYear={[{ total_elevation_gain: 1000}] }/>);
  //expect(component).toMatchSnapshot();
})

