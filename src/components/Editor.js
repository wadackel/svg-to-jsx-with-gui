import React, { Component } from 'react';
import styled from 'styled-components';
import AceEditor from 'react-ace';
import 'brace/mode/html';
import 'brace/mode/jsx';
import 'brace/theme/monokai';
import { palette, darken, brighten } from '../styles';

const EditorHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 10;
  height: 40px;
  padding: 0 20px;
  background: ${palette.secondaryDark};
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
  background: ${palette.secondary};
  font-size: 14px;
  line-height: 1.6;

  & .ace_editor {
    position: absolute;
    top: 40px;
    right: 0;
    left: 0;
    width: 100% !important;
    height: calc(100% - 40px) !important;
    color: #ccc !important;
  }

  & .ace_editor,
  & .ace_gutter {
    background: ${palette.secondary} !important;
  }

  & .ace_marker-layer .ace_selection {
    background: ${brighten(palette.secondary, 0.4)} !important;
  }

  & .ace_gutter {
    color: ${palette.secondaryLight} !important;
  }

  & .ace_gutter-active-line,
  & .ace_marker-layer .ace_active-line {
    background: ${darken(palette.secondary, 0.1)} !important;
  }

  & .ace_scroller.ace_scroll-left {
    transition: box-shadow 120ms ease-out;

    &.ace_scroll-left {
      box-shadow: 17px 0 16px -16px rgba(0, 0, 0, 0.2) inset !important;
    }
  }

  & .ace_entity,
  & .ace_keyword,
  & .ace_meta.ace_tag,
  & .ace_storage {
    color: #dd9999 !important;
  }

  & .ace_entity.ace_name.ace_function,
  & .ace_entity.ace_other,
  & .ace_entity.ace_other.ace_attribute-name,
  & .ace_variable {
    color: #71ddf1 !important;
  }

  & .ace_string {
    color: #fff8b7 !important;
  }

  & .ace_storage.ace_type,
  & .ace_support.ace_class,
  & .ace_support.ace_type {
    color: #5092e3;
    font-style: normal !important;
  }

  & .ace_comment {
    color: #818495 !important;
  }
`;

const EditorButtonList = styled.div`
  margin-right: -20px;
  text-align: right;
`;

export default class Editor extends Component {
  static defaultProps = {
    showGutter: false,
    useSoftTabs: false,
  };

  handleRef = (editor) => {
    this.editor = editor;
  };

  render() {
    const {
      title,
      buttons,
      useSoftTabs,
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

        <AceEditor
          {...rest}
          showPrintMargin={false}
          setOptions={{
            displayIndentGuides: true,
            useSoftTabs,
          }}
          theme="monokai"
          ref={this.handleRef}
        />
      </EditorWrapper>
    );
  }
}
