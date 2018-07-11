import React from 'react';
import renderer from 'react-test-renderer'
import { Activities } from "../activities";

test("activities renders correctly", () => {
  const component = renderer.create(<Activities />)
  //const tree = component.toJSON();
  expect(component).toMatchSnapshot();
});

/*
* test is globablly avaliable from jest
* */