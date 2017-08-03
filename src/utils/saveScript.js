import { saveAs } from 'file-saver';

const saveScript = (script, fileName) => {
  saveAs(
    new Blob([script], { type: 'text/javascript;charset=utf-8' }),
    fileName,
  );
};

export default saveScript;
