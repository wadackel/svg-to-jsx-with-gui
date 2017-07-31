/* eslint-disable */
import svg2js from 'svgo/lib/svgo/svg2js';
import js2svg from 'svgo/lib/svgo/js2svg';
import plugins from 'svgo/lib/svgo/plugins';
import removeDoctype from 'svgo/plugins/removeDoctype';
import removeXMLProcInst from 'svgo/plugins/removeXMLProcInst';
import cleanupIDs from 'svgo/plugins/cleanupIDs';
import HTMLtoJSX from '@tsuyoshiwada/htmltojsx';

const svgoProcessor = async (value) => new Promise((resolve) => {
  svg2js(value, (svg) => {
    plugins(svg, [
      [
        removeDoctype,
        removeXMLProcInst,
      ],
      [
        cleanupIDs,
      ],
    ]);

    const jsx = js2svg(svg, {
      indent: '  ',
      pretty: true,
    }).data;

    resolve(jsx);
  });
});

const html2jsxProcessor = async (value) => new Promise((resolve) => {
  const converter = new HTMLtoJSX({
    createClass: false,
    indent: '  ',
  });

  resolve(converter.convert(value).trim());
});

export const factory = () => {
  return async (value) => {
    const processors = [
      svgoProcessor,
      html2jsxProcessor,
    ];

    for (let processor of processors) {
      value = await processor(value);
    }

    return value;
  };
};
