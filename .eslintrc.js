/* eslint-disable quote-props */
module.exports = {
  'parser': 'babel-eslint',
  'env': {
    'browser': true,
    'node': true,
    'jest/globals': true,
  },
  'extends': [
    'airbnb',
    'plugin:flowtype/recommended',
    'plugin:jest/recommended',
  ],
  'plugins': [
    'flowtype',
    'jest',
  ],
  'rules': {
    'react/jsx-filename-extension': 'off',
    'react/no-find-dom-node': 'off',
    'react/sort-comp': 'off',
  },
};
