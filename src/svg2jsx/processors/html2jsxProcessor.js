import HTMLtoJSX from '@tsuyoshiwada/htmltojsx';

const html2jsxProcessor = (options) => {
  const converter = new HTMLtoJSX({
    ...options,
    createClass: false,
  });

  return value => new Promise((resolve, reject) => {
    try {
      resolve(converter.convert(value).trim());
    } catch (e) {
      reject(e);
    }
  });
};

export default html2jsxProcessor;
