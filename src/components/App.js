import React, { Component } from 'react';
import styled from 'styled-components';
import { saveAs } from 'file-saver';
import { palette, darken } from '../styles';
import { Copy, Download } from './icons/';
import Droppable from './Droppable';
import Footer from './Footer';
import Settings from './Settings';
import Editor from './Editor';
import EditorButton from './EditorButton';
import EditorRow from './EditorRow';
import ErrorPopover from './ErrorPopover';
import withCopy from './hoc/withCopy';
import svg2jsx from '../svg2jsx/';
import file2string from '../utils/file2string';
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


const EditorCopyButton = withCopy(EditorButton);


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

    saveAs(
      new Blob([this.state.jsx], { type: 'text/javascript;charset=utf-8' }),
      'svg.jsx'
    );
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
        <EditorRow>
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
                  icon={<Copy />}
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
                <EditorButton
                  icon={<Download />}
                  onClick={this.handleDownloadClick}
                >
                  Download
                </EditorButton>,
              ]}
              {...settings.editor}
            />
          </div>
        </EditorRow>

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
