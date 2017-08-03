import React from 'react';
import EditorButton from './EditorButton';
import { Download } from '../icons/';

const EditorDownloadButton = (props) => (
  <EditorButton
    icon={<Download />}
    {...props}
  />
);

export default EditorDownloadButton;
