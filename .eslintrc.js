/* eslint-disable quote-props */
module.exports = {
  'parser': 'babel-eslint',
  'env': {
    'browser': true,
    'node': true,
  },
  'extends': [
    'plugin:flowtype/recommended',
    'airbnb',
  ],
  'plugins': [
    'flowtype',
  ],
  'rules': {
    'react/jsx-filename-extension': 'off',
    'react/no-find-dom-node': 'off',
  },
};
