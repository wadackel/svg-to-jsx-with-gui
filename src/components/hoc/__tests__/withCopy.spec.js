import React from 'react';
import { mount } from 'enzyme';
import withDroppable from '../withDroppable';


describe('components#hoc#withDroppable()', () => {
  test('Should be render children', () => {
    const Droppable = withDroppable(() => (
      <div>Foo</div>
    ));

    const wrapper = mount(<Droppable />);

    expect(wrapper.contains(<div>Foo</div>)).toBe(true);
  });


  test('Should be call for props callback', () => {
    const onDrop = jest.fn();
    const onDragEnter = jest.fn();
    const onDragLeave = jest.fn();
    const Droppable = withDroppable(() => null);
    const wrapper = mount(<Droppable
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    />);

    expect(onDrop.mock.calls.length).toBe(0);
    wrapper.instance().handleDrop(['foo', 'bar']);
    expect(onDrop.mock.calls.length).toBe(1);
    expect(onDrop.mock.calls[0]).toEqual(['foo']);

    expect(onDragEnter.mock.calls.length).toBe(0);
    wrapper.instance().handleDragEnter('enter');
    expect(onDragEnter.mock.calls.length).toBe(1);
    expect(onDragEnter.mock.calls[0]).toEqual(['enter']);

    expect(onDragLeave.mock.calls.length).toBe(0);
    wrapper.instance().handleDragLeave('leave');
    expect(onDragLeave.mock.calls.length).toBe(1);
    expect(onDragLeave.mock.calls[0]).toEqual(['leave']);
  });


  test('Should be handle drag over state', () => {
    const Droppable = withDroppable(() => null);
    const wrapper = mount(<Droppable />);

    expect(wrapper.state('isDragOver')).toBe(false);

    wrapper.instance().handleDragEnter('foo');
    expect(wrapper.state('isDragOver')).toBe(true);

    wrapper.instance().handleDragLeave('foo');
    expect(wrapper.state('isDragOver')).toBe(false);

    wrapper.instance().handleDragEnter('foo');
    expect(wrapper.state('isDragOver')).toBe(true);

    wrapper.instance().handleDragEnter('foo');
    expect(wrapper.state('isDragOver')).toBe(true);

    wrapper.instance().handleDrop([]);
    expect(wrapper.state('isDragOver')).toBe(false);
  });
});
