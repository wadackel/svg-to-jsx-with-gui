import React from 'react';
import { shallow } from 'enzyme';
import { Droppable } from '../Droppable';


describe('components#<Droppable />', () => {
  test('Should be render', () => {
    const wrapper = shallow(<Droppable isDragOver={false}>Foo</Droppable>);

    expect(wrapper).toMatchSnapshot();
  });


  test('Should be render overlay', () => {
    const wrapper = shallow(<Droppable isDragOver>Bar</Droppable>);

    expect(wrapper).toMatchSnapshot();
  });
});
