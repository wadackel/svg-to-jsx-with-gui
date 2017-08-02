import React, { Component } from 'react';
import styled from 'styled-components';
import { saveAs } from 'file-saver';
import { palette, darken } from '../styles';
import Footer from './Footer';
import Settings from './Settings';
import Editor from './Editor';
import EditorButton from './EditorButton';
import withCopy from './hoc/withCopy';
import { Copy, Download } from '../icons/';
import { factory } from '../utils/svg2jsx';
import filterSvgProcessor from '../utils/processors/filterSvg';
import svgoProcessor from '../utils/processors/svgo';
import html2jsxProcessor from '../utils/processors/html2jsx';
import makeCancelable from '../utils/makeCancelable';
import fixture from '../fixture';

const EditorRow = styled.div`
  display: flex;

  & > div {
    flex: 1 1 50%;
    position: relative;
    max-width: 50%;

    &:not(:first-child)::before {
      display: block;
      position: absolute;
      top: 0;
      left: -2px;
      bottom: 0;
      z-index: 11;
      width: 4px;
      height: 100%;
      background: ${darken(palette.secondary, 0.3)};
      content: '';
    }
  }
`;

const EditorCopyButton = withCopy(EditorButton);


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      svg: fixture,
      jsx: '',
      settings: {
        svgoPlugins: [
          'convertColors',
          'collapseGroups',
          'removeDimensions',
          'removeDesc',
          'removeDoctype',
          'removeEditorsNSData',
          'removeEmptyAttrs',
          'removeEmptyContainers',
          'removeEmptyText',
          'removeHiddenElems',
          'removeMetadata',
          'removeUselessDefs',
          'removeUselessStrokeAndFill',
          'removeXMLProcInst',
        ],
        editor: {
          fontSize: 13,
          tabSize: 2,
          showGutter: true,
          useSoftTabs: true,
        },
      },
    };

    this.svg2jsx = this.createConverter();
    this.promise = null;
    this.cancel = null;
  }

  componentWillMount() {
    this.compile(this.state.svg);
  }

  componentWillUnmount() {
    this.cancelIfNeeded();
  }

  createConverter() {
    const { settings } = this.state;

    return factory(
      filterSvgProcessor(),
      svgoProcessor(settings.svgoPlugins),
      html2jsxProcessor({
        indent: ''.repeat(settings.editor.tabSize),
      }),
    );
  }

  async compile(svg) {
    const { promise, cancel } = makeCancelable(this.svg2jsx(svg));
    this.promise = promise;
    this.cancel = cancel;

    const jsx = await promise;
    this.promise = null;
    this.cancel = null;

    this.setState({ jsx });
  }

  cancelIfNeeded() {
    if (this.cancel) {
      this.cancel();
      this.cancel = null;
    }
  }

  handleChange = async (svg) => {
    this.setState({ svg });
    this.compile(svg);
  };

  handleSettingChange = (settings) => {
    this.setState({ settings }, () => {
      this.svg2jsx = this.createConverter();
      this.compile(this.state.svg);
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
      settings,
    } = this.state;

    return (
      <div>
        <EditorRow>
          <div>
            <Editor
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
      </div>
    );
  }
}
