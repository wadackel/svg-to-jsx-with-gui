export const factory = (...processors) => {
  return async (value) => {
    for (let processor of processors) {
      try {
        value = await processor(value);
      } catch (e) {
        console.log('ERROR:', e);
        break;
      }
    }

    return value;
  };
};
