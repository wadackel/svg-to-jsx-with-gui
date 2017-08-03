/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
class ConvertResult {
  constructor(value) {
    this.value = value;
    this.error = null;
  }

  toString() {
    return this.value;
  }

  toObject() {
    return {
      value: this.value,
      error: this.error,
    };
  }
}

class Converter {
  constructor(...processors) {
    this.processors = processors;
  }

  async convert(value) {
    const result = new ConvertResult(value);

    try {
      for (const processor of this.processors) {
        result.value = await processor(result.value);
      }
    } catch (e) {
      result.error = e.message;
    }

    return result.toObject();
  }
}

const svg2jsx = (...processors) => (
  new Converter(...processors)
);

export default svg2jsx;
