import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../Footer';


describe('components#<Footer />', () => {
  test('Should be render', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot();
  });
});
