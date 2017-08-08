// @flow
const file2string = (file: File): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();

  reader.onload = () => {
    resolve(reader.result.toString());
  };

  reader.onerror = (e) => {
    reject(e);
  };

  reader.readAsText(file);
});

export default file2string;
