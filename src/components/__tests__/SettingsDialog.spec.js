import React from 'react';
import { shallow } from 'enzyme';
import SettingsDialog, { DialogWrapper, CloseButton } from '../SettingsDialog';


describe('components#<SettingsDialog />', () => {
  test('Should be render', () => {
    const wrapper = shallow(<SettingsDialog />);
    expect(wrapper).toMatchSnapshot();
  });


  test('Should be call onRequestClose when ESC is keyed down', () => {
    const fn = jest.fn();
    const wrapper = shallow(<SettingsDialog onRequestClose={fn} />);

    wrapper.instance().form = {
      isValid: () => true,
      getValues: () => 'foo',
    };

    expect(fn.mock.calls.length).toBe(0);

    wrapper.find(DialogWrapper).simulate('keydown', { keyCode: 27 });

    expect(fn.mock.calls.length).toBe(1);
  });


  test('Should be call onRequestClose when close button click', () => {
    const fn = jest.fn();
    const wrapper = shallow(<SettingsDialog onRequestClose={fn} />);

    wrapper.instance().form = {
      isValid: () => true,
      getValues: () => 'foo',
    };

    expect(fn.mock.calls.length).toBe(0);

    wrapper.find(CloseButton).simulate('click', { preventDefault: () => null });

    expect(fn.mock.calls.length).toBe(1);
  });
});
