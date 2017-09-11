// @flow
import HTMLtoJSX from 'htmltojsx';
import type { Processor } from '../index';

type HTMLtoJSXOptions = {
  indent?: string;
  createClass?: boolean;
};

const html2jsxProcessor = (options: HTMLtoJSXOptions): Processor => {
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
