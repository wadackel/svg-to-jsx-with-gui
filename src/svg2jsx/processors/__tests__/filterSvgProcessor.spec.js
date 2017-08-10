import filterSvgProcessor from '../filterSvgProcessor';


describe('svg2jsx#processors#filterSvgProcessor', () => {
  test('Should be return filtered svg string', async () => {
    expect.assertions(1);

    const p = filterSvgProcessor();
    const result = await p(`
      <div>
        <h1>Title</h1>
        <p>
          <svg class="foo" id="bar" viewBox="0 0 12 12"></svg>
        </p>
      </div>
    `.trim());

    expect(result).toBe('<svg class="foo" id="bar" viewBox="0 0 12 12"></svg>');
  });


  test('Should be return error when not found svg', async () => {
    expect.assertions(1);

    const p = filterSvgProcessor();

    try {
      await p(`
        <div>
          <h1>Title</h1>
          <footer>
            <p>SVG svg.</p>
          </footer>
        </div>
      `.trim());
    } catch (e) {
      expect(e.message).toContain('Not found');
    }
  });
});
