// @flow
export type FunctionalComponent<P> = (props: P) => ?React$Element<any>;
export type ClassComponent<D, P, S> = Class<React$Component<D, P, S>>;
export type ReactComponent<D, P, S> = FunctionalComponent<P> | ClassComponent<D, P, S>;

export type SVGOPlugins = Array<string>;

export type EditorSettings = {
  fontSize: number;
  tabSize: number;
  showGutter: boolean;
  useSoftTabs: boolean;
};

export type SettingsObject = {
  svgoPlugins: SVGOPlugins;
  editor: EditorSettings;
};
