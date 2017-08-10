import React from 'react';
import { shallow } from 'enzyme';
import { SettingsForm } from '../SettingsForm';


describe('components#<SettingsForm />', () => {
  test('Should be render', () => {
    const wrapper = shallow(<SettingsForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
