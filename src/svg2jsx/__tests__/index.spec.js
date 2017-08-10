import Converter from '../';


describe('svg2jsx#Converter', () => {
  test('Should be call processors', async () => {
    expect.assertions(1);

    const foo = jest.fn(v => Promise.resolve(`${v}-foo`));
    const bar = jest.fn(v => Promise.resolve(`${v}-bar`));
    const c = new Converter(foo, bar);
    const result = await c.convert('test');

    expect(result).toEqual({
      value: 'test-foo-bar',
      error: null,
    });
  });


  test('Should be return result with errors when promise.reject', async () => {
    expect.assertions(1);

    const foo = jest.fn(v => Promise.resolve(`${v}-foo`));
    const bar = jest.fn(() => Promise.reject(new Error('test')));
    const c = new Converter(foo, bar);
    const result = await c.convert('test');

    expect(result).toEqual({
      value: 'test-foo',
      error: 'test',
    });
  });
});
