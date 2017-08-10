import React from 'react';
import { shallow } from 'enzyme';
import EditorButton from '../EditorButton';


describe('components#<EditorButton />', () => {
  test('Should be render', () => {
    const wrapper = shallow(
      <EditorButton>
        Foo
      </EditorButton>,
    );

    expect(wrapper).toMatchSnapshot();
  });


  test('Should be render icon', () => {
    const wrapper = shallow(
      <EditorButton
        icon={
          <svg width={10} height={10}>
            <title>icon</title>
          </svg>
        }
      >
        Bar
      </EditorButton>,
    );

    expect(wrapper).toMatchSnapshot();
  });


  test('Should be call onClick when fired click event', () => {
    const fn = jest.fn();
    const wrapper = shallow(<EditorButton onClick={fn} />);

    expect(fn.mock.calls.length).toBe(0);

    wrapper.simulate('click', { preventDefault: () => null });

    expect(fn.mock.calls.length).toBe(1);
  });
});
