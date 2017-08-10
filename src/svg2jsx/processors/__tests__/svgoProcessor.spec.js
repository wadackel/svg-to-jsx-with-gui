import svgoProcessor from '../svgoProcessor';


describe('svg2jsx#processors#svgoProcessor', () => {
  test('Should be return filtered svg string', async () => {
    expect.assertions(1);

    const p = svgoProcessor([
      'cleanupIDs',
      'removeTitle',
    ]);

    const result = await p(`
<svg id="foo" class="bar">
  <title>FOO-BAR</title>
  <desc>TEST</desc>
</svg>
    `.trim());

    expect(result.trim()).toBe(`
<svg class="bar">
  <desc>
    TEST
  </desc>
</svg>
    `.trim());
  });


  test('Should be return error when failure parsing', async () => {
    expect.assertions(1);

    const p = svgoProcessor([]);

    try {
      await p('<svg class="><title></title></svg>');
    } catch (e) {
      expect(e.message).toContain('Error in parsing');
    }
  });
});
