import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import Converter from '../../svg2jsx/';


describe('components#<App />', () => {
  beforeEach(() => {
    localStorage.clear();
  });


  test('Should be render', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });


  test('Should be create converter', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.instance().createConverter() instanceof Converter).toBe(true);
  });


  test('Should be convert svg string to jsx string', async () => {
    expect.assertions(4);

    const convert = jest.fn(() => Promise.resolve({ value: 'jsx', error: null }));
    const wrapper = shallow(<App />);

    wrapper.instance().converter = {
      convert,
    };

    expect(convert.mock.calls.length).toBe(0);

    await wrapper.instance().convert('svg');

    expect(convert.mock.calls.length).toBe(1);
    expect(convert.mock.calls[0]).toEqual(['svg']);
    expect(wrapper.state('jsx')).toBe('jsx');
  });


  test('Should be handle error when convert string', async () => {
    expect.assertions(2);

    const wrapper = shallow(<App />);

    wrapper.instance().converter = {
      convert: () => Promise.resolve({ value: 'test', error: 'error!!' }),
    };

    wrapper.setState({
      ...wrapper.state(),
      jsx: 'jsx',
      error: '',
    });

    await wrapper.instance().convert('svg');

    expect(wrapper.state('jsx')).toBe('test');
    expect(wrapper.state('error')).toBe('error!!');
  });


  test('Should be store settings', () => {
    const wrapper = shallow(<App />);
    const settings = { foo: 'foo', bar: 'bar' };

    wrapper.instance().storeSettings(settings);
    expect(wrapper.state('settings')).toEqual(settings);
    expect(localStorage.getItem('settings')).toBe(JSON.stringify(settings));
  });


  test('Should be restore settings', () => {
    const wrapper = shallow(<App />);
    const defaultSettings = { editor: {}, svgoPlugins: [] };
    const afterSettings = { editor: {}, svgoPlugins: [] };

    wrapper.setState({
      ...wrapper.state(),
      settings: defaultSettings,
    });

    wrapper.instance().restoreSettings();
    expect(wrapper.state('settings')).toEqual(defaultSettings);

    localStorage.setItem('settings', JSON.stringify(afterSettings));
    wrapper.instance().restoreSettings();
    expect(wrapper.state('settings')).toEqual(afterSettings);
  });


  test('Should be call restoreSettings when component will mount', () => {
    const settings = { svgoPlugins: [], editor: { fontSize: 10000 } };
    localStorage.setItem('settings', JSON.stringify(settings));

    const wrapper = shallow(<App />);
    expect(wrapper.state('settings')).toEqual(settings);
  });
});
