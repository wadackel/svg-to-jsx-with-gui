import React from 'react';
import { shallow } from 'enzyme';
import Button from '../Button';


describe('components#<Button />', () => {
  test('Should be render', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper).toMatchSnapshot();
  });
});
