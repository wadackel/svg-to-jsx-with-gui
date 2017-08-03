import React, { Component } from 'react';
import withCopy from '../hoc/withCopy';
import EditorButton from './EditorButton';
import { Copy } from '../icons/';

// eslint-disable-next-line react/prefer-stateless-function
class EditorCopyButton extends Component {
  render() {
    return (
      <EditorButton
        {...this.props}
        icon={<Copy />}
      />
    );
  }
}

export default withCopy(EditorCopyButton);
