import React from 'react';
import { shallow } from 'enzyme';
import withCopy from '../withCopy';


describe('components#hoc#withCopy()', () => {
  test('Should be render', () => {
    const Component = withCopy(() => null);
    const wrapper = shallow(<Component renderer={() => <div>TEST</div>} />);

    expect(wrapper.contains(<div>TEST</div>)).toBe(true);
  });


  test('Should be pass 2 arguments to renderer in props', () => {
    const Component = withCopy(() => null);
    const success = jest.fn(a => a && <div>success</div>);
    const failure = jest.fn((a, b) => b && <div>failure</div>);
    const defaults = jest.fn((a, b) => (!a && !b) && <div>default</div>);
    const wrapper = shallow(<Component renderer={defaults} />);

    expect(wrapper.contains(<div>default</div>)).toBe(true);

    wrapper.setProps({ ...wrapper.props(), renderer: success });
    wrapper.instance().success();
    expect(wrapper.contains(<div>success</div>)).toBe(true);

    wrapper.setProps({ ...wrapper.props(), renderer: failure });
    wrapper.instance().failure();
    expect(wrapper.contains(<div>failure</div>)).toBe(true);
  });
});
