import React, { Component } from 'react';
import styled from 'styled-components';
import { palette, darken } from '../styles';
import svg2jsx from '../svg2jsx/';
import file2string from '../utils/file2string';
import saveScript from '../utils/saveScript';
import {
  filterSvgProcessor,
  svgoProcessor,
  html2jsxProcessor,
} from '../svg2jsx/processors/';
import makeCancelable from '../utils/makeCancelable';
import {
  defaultSvgoPlugins,
  defaultEditorSettings,
  defaultSvgString,
} from '../constants';
import Droppable from './Droppable';
import Footer from './Footer';
import Settings from './Settings';
import ErrorPopover from './ErrorPopover';
import {
  Editor,
  EditorSplit,
  EditorCopyButton,
  EditorDownloadButton,
} from './Editor/';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      svg: defaultSvgString,
      jsx: '',
      error: null,
      settings: {
        svgoPlugins: defaultSvgoPlugins,
        editor: defaultEditorSettings,
      },
    };

    this.converter = this.createConverter();
    this.promise = null;
    this.cancel = null;
  }

  componentWillMount() {
    this.convert(this.state.svg);
  }

  componentWillUnmount() {
    this.convertCancelIfNeeded();
  }

  createConverter() {
    const { settings } = this.state;

    return svg2jsx(
      filterSvgProcessor(),
      svgoProcessor(settings.svgoPlugins),
      html2jsxProcessor({
        indent: ''.repeat(settings.editor.tabSize),
      }),
    );
  }

  async convert(svg) {
    const { promise, cancel } = makeCancelable(this.converter.convert(svg));
    this.promise = promise;
    this.cancel = cancel;

    const { value: jsx, error } = await promise;
    this.setState({ jsx, error });
    this.promise = null;
    this.cancel = null;
  }

  convertCancelIfNeeded() {
    if (this.cancel) {
      this.cancel();
      this.cancel = null;
    }
  }

  handleDrop = async (file) => {
    try {
      const svg = await file2string(file);
      this.setState({ svg });
      this.convert(svg);
    } catch (e) {
      this.setState({ error: e.message });
    }
  };

  handleChange = async (svg) => {
    this.setState({ svg });
    this.convert(svg);
  };

  handleSettingChange = (settings) => {
    this.setState({ settings }, () => {
      this.converter = this.createConverter();
      this.convert(this.state.svg);
    });
  };

  handleDownloadClick = (e) => {
    e.preventDefault();
    saveScript(this.state.jsx, 'svg.jsx');
  };

  render() {
    const {
      svg,
      jsx,
      error,
      settings,
    } = this.state;

    return (
      <Droppable
        onDrop={this.handleDrop}
      >
        <EditorSplit>
          <div>
            <Editor
              focus
              mode="html"
              title="SVG"
              value={svg}
              onChange={this.handleChange}
              {...settings.editor}
            />
          </div>
          <div>
            <Editor
              readOnly
              mode="jsx"
              title="JSX"
              value={jsx}
              buttons={[
                <EditorCopyButton
                  textBy={() => jsx}
                  renderer={(success, failure) => {
                    if (!success && !failure) {
                      return 'Copy';
                    } else if (success) {
                      return 'Copied!';
                    } else {
                      return 'Error...';
                    }
                  }}
                />,
                <EditorDownloadButton
                  onClick={this.handleDownloadClick}
                >
                  Download
                </EditorDownloadButton>,
              ]}
              {...settings.editor}
            />
          </div>
        </EditorSplit>

        <Footer />

        <Settings
          settings={settings}
          onChange={this.handleSettingChange}
        />

        <ErrorPopover>{error}</ErrorPopover>
      </Droppable>
    );
  }
}
