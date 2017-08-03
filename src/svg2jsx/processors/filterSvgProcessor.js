const filterSvgProcessor = () => (
  value => new Promise((resolve, reject) => {
    const result = value.match(/<svg[\S\s]*<\/svg>/g);

    if (result) {
      resolve(result[0]);
    } else {
      reject(new Error('Not found svg element'));
    }
  })
);

export default filterSvgProcessor;
