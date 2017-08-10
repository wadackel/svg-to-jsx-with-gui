import React from 'react';
import { shallow } from 'enzyme';
import EditorSplit from '../EditorSplit';


describe('components#<EditorSplit />', () => {
  test('Should be render', () => {
    const wrapper = shallow(<EditorSplit />);
    expect(wrapper).toMatchSnapshot();
  });
});
