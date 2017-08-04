module.exports = {
  processors: process.env.NODE_ENV === 'jslint'
    ? ['stylelint-processor-styled-components']
    : [],
  extends: 'stylelint-config-standard',
};
