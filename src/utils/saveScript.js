// @flow
import { saveAs } from 'file-saver';

const saveScript = (script: string, fileName: string): void => {
  saveAs(
    new Blob([script], { type: 'text/javascript;charset=utf-8' }),
    fileName,
  );
};

export default saveScript;
