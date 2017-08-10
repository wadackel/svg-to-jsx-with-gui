import React from 'react';
import { shallow } from 'enzyme';
import Settings, { OpenButton } from '../Settings';


describe('components#<Settings />', () => {
  test('Should be render', () => {
    const wrapper = shallow(<Settings />);
    expect(wrapper).toMatchSnapshot();
  });


  test('Should be render when open', () => {
    const wrapper = shallow(<Settings />);
    wrapper.setState({ ...wrapper.state(), open: true });
    expect(wrapper).toMatchSnapshot();
  });


  test('Should be dialog open when <OpenButton /> click', () => {
    const wrapper = shallow(<Settings />);

    expect(wrapper.state('open')).toBe(false);

    wrapper.find(OpenButton).simulate('click', { preventDefault: () => null });
    expect(wrapper.state('open')).toBe(true);
  });
});
