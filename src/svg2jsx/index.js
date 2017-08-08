// @flow

/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

export type Processor = (value: string) => Promise<string>;

class ConvertResult {
  value: string;
  error: ?string = null;

  constructor(value: string) {
    this.value = value;
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

export default class Converter {
  processors: Array<Processor>;

  constructor(...processors: Array<Processor>) {
    this.processors = processors;
  }

  async convert(value: string) {
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
