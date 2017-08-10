import React from 'react';
import { shallow } from 'enzyme';
import ErrorPopover from '../ErrorPopover';


describe('components#<ErrorPopover />', () => {
  test('Should be render', () => {
    const wrapper = shallow(<ErrorPopover />);
    expect(wrapper).toMatchSnapshot();
  });
});
