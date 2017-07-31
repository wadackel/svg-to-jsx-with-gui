/* eslint-disable */
import React, { Component } from 'react';
import styled from 'styled-components';
import CodeMirror from 'react-codemirror';

const EditorHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 10;
  height: 40px;
  padding: 0 20px;
  background: #31364f;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.22);
  color: #fff;
`;

const EditorTitle = styled.div`
  flex: 0 1 auto;
  font-size: 1.14rem;
`;

const EditorWrapper = styled.div`
  position: relative;
  height: calc(100vh - 60px);
  background: #353954;
  font-size: 14px;
  line-height: 1.6;

  & .CodeMirror {
    position: absolute;
    top: 50px;
    right: 0;
    left: 0;
    height: calc(100% - 50px);
  }

  & .CodeMirror,
  & .CodeMirror-gutters {
    background: #353954 !important;
  }

  & .CodeMirror-linenumber {
    color: #4c5275 !important;
  }

  & .CodeMirror-scrollbar-filler {
    background: transparent;
  }
`;

const EditorButtonList = styled.div`
  margin-right: -20px;
  text-align: right;
`;

export default class Editor extends Component {
  static defaultProps = {
    readOnly: false,
    options: {
      mode: 'html',
      theme: 'material',
      lineNumbers: true,
    },
  };

  componentWillReceiveProps(nextProps) {
    const { value: _value } = this.props;
    const { value, readOnly } = nextProps;

    if (readOnly && value !== _value && this.editor) {
      this.editor.getCodeMirror().doc.setValue(value);
    }
  }

  handleRef = (editor) => {
    this.editor = editor;
  };

  render() {
    const {
      title,
      mode,
      readOnly,
      options,
      buttons,
      ...rest
    } = this.props;

    return (
      <EditorWrapper>
        <EditorHeader>
          <EditorTitle>
            {title}
          </EditorTitle>
          {buttons &&
            <EditorButtonList>
              {buttons.map((button, index) => (
                React.cloneElement(button, {
                  ...button.props,
                  key: index,
                })
              ))}
            </EditorButtonList>
          }
        </EditorHeader>

        <CodeMirror
          {...rest}
          ref={this.handleRef}
          options={{
            ...options,
            mode,
            readOnly,
          }}
        />
      </EditorWrapper>
    );
  }
}
