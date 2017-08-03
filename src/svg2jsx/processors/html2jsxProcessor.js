import HTMLtoJSX from '@tsuyoshiwada/htmltojsx';

const html2jsxProcessor = (options) => {
  const converter = new HTMLtoJSX({
    ...options,
    createClass: false,
  });

  return (value) => new Promise((resolve, reject) => {
    resolve(converter.convert(value).trim());
  });
};

export default html2jsxProcessor;
