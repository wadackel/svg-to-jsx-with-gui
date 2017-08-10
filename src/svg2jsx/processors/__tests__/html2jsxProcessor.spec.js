import html2jsxProcessor from '../html2jsxProcessor';


describe('svg2jsx#processors#html2jsxProcessor', () => {
  test('Should be return filtered svg string', async () => {
    expect.assertions(1);

    const p = html2jsxProcessor({ indent: '', createClass: false });
    const result = await p(`
<svg width="10" height="20" class="foo">
  <!-- Comment -->
  <rect stroke-width="2" fill="none"></rect>
</svg>
    `.trim());

    expect(result).toBe(`
<svg width={10} height={20} className="foo">
  {/* Comment */}
  <rect strokeWidth={2} fill="none" />
</svg>
    `.trim());
  });
});
