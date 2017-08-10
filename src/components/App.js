// @flow
import React, { Component } from 'react';
import file2string from '../utils/file2string';
import saveScript from '../utils/saveScript';
import Converter from '../svg2jsx/';
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
import Droppable from './Droppable'; // eslint-disable-line import/no-named-as-default
import Footer from './Footer';
import Settings from './Settings';
import ErrorPopover from './ErrorPopover';
import {
  Editor,
  EditorSplit,
  EditorCopyButton,
  EditorDownloadButton,
} from './Editor/';
import type { SettingsObject } from '../types';


type Props = {
};

type State = {
  svg: string;
  jsx: string;
  error: ?string;
  settings: SettingsObject;
};


const STORE_SETTINGS_KEY = 'settings';


export default class App extends Component {
  props: Props;
  state: State;
  converter: Converter;
  promise: ?Promise<{ value: string; error: ?string }>;
  cancel: ?Function;

  constructor(props: Props) {
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

    this.promise = null;
    this.cancel = null;
  }

  componentWillMount() {
    this.restoreSettings(() => {
      this.converter = this.createConverter();
      this.convert(this.state.svg);
    });
  }

  componentWillUnmount() {
    this.convertCancelIfNeeded();
  }

  createConverter() {
    const { settings } = this.state;

    return new Converter(
      filterSvgProcessor(),
      svgoProcessor(settings.svgoPlugins),
      html2jsxProcessor({
        indent: ''.repeat(settings.editor.tabSize),
      }),
    );
  }

  storeSettings(settings: $Shape<SettingsObject>, callback?: () => void): void {
    localStorage.setItem(STORE_SETTINGS_KEY, JSON.stringify(settings));
    this.setState({ settings }, callback);
  }

  restoreSettings(callback?: () => void): void {
    const storedData: ?string = localStorage.getItem(STORE_SETTINGS_KEY);

    if (storedData) {
      const settings: SettingsObject = JSON.parse(storedData);
      this.setState({ settings }, callback);
    } else if (typeof callback === 'function') {
      callback();
    }
  }

  async convert(svg: string): * {
    const { promise, cancel } = makeCancelable(this.converter.convert(svg));
    this.promise = promise;
    this.cancel = cancel;

    const { value: jsx, error } = await promise;
    this.setState({ jsx, error });
    this.promise = null;
    this.cancel = null;
  }

  convertCancelIfNeeded(): void {
    if (this.cancel) {
      this.cancel();
      this.cancel = null;
    }
  }

  handleDrop = async (file: File): * => {
    try {
      const svg = await file2string(file);
      this.setState({ svg });
      this.convert(svg);
    } catch (e) {
      this.setState({ error: e.message });
    }
  };

  handleChange = (svg: string): void => {
    this.setState({ svg });
    this.convert(svg);
  };

  handleSettingChange = (settings: SettingsObject): void => {
    this.storeSettings(settings, () => {
      this.converter = this.createConverter();
      this.convert(this.state.svg);
    });
  };

  handleDownloadClick = (e: Event): void => {
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
                    }
                    return 'Error...';
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
