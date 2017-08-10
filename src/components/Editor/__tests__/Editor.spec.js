import React from 'react';
import { shallow } from 'enzyme';
import Editor from '../Editor';


describe('components#<Editor />', () => {
  test('Should be render', () => {
    const wrapper = shallow(<Editor />);
    expect(wrapper).toMatchSnapshot();
  });
});
