/* eslint-disable */
import React, { Component } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Settings from './Settings';
import Editor from './Editor';
import EditorButton from './EditorButton';
import { Copy, Download } from '../icons/';
import { factory } from '../utils/svg2jsx';
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
      background: #2a2e44;
      content: '';
    }
  }
`;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      svg: fixture,
      jsx: '',
      settings: {
      },
    };

    this.svg2jsx = factory();
    this.promise = null;
    this.cancel = null;
  }

  componentWillMount() {
    this.compile(this.state.svg);
  }

  componentWillUnmount() {
    this.cancelIfNeeded();
  }

  handleChange = async (svg) => {
    this.setState({ svg });
    this.compile(svg);
  };

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
              title="SVG"
              value={svg}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <Editor
              readOnly
              title="JSX"
              value={jsx}
              buttons={[
                <EditorButton
                  icon={<Copy />}
                >
                  Copy
                </EditorButton>,
                <EditorButton
                  icon={<Download />}
                >
                  Download
                </EditorButton>,
              ]}
            />
          </div>
        </EditorRow>

        <Footer />

        <Settings />
      </div>
    );
  }
}
