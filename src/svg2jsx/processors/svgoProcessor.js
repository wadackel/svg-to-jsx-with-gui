// @flow
import svg2js from 'svgo/lib/svgo/svg2js';
import js2svg from 'svgo/lib/svgo/js2svg';
import plugins from 'svgo/lib/svgo/plugins';
import cleanupIDs from 'svgo/plugins/cleanupIDs';
import cleanupListOfValues from 'svgo/plugins/cleanupListOfValues';
import convertColors from 'svgo/plugins/convertColors';
import collapseGroups from 'svgo/plugins/collapseGroups';
import convertPathData from 'svgo/plugins/convertPathData';
import convertShapeToPath from 'svgo/plugins/convertShapeToPath';
import mergePaths from 'svgo/plugins/mergePaths';
import removeDimensions from 'svgo/plugins/removeDimensions';
import removeDesc from 'svgo/plugins/removeDesc';
import removeDoctype from 'svgo/plugins/removeDoctype';
import removeEditorsNSData from 'svgo/plugins/removeEditorsNSData';
import removeEmptyAttrs from 'svgo/plugins/removeEmptyAttrs';
import removeEmptyContainers from 'svgo/plugins/removeEmptyContainers';
import removeEmptyText from 'svgo/plugins/removeEmptyText';
import removeHiddenElems from 'svgo/plugins/removeHiddenElems';
import removeMetadata from 'svgo/plugins/removeMetadata';
import removeTitle from 'svgo/plugins/removeTitle';
import removeUselessDefs from 'svgo/plugins/removeUselessDefs';
import removeUselessStrokeAndFill from 'svgo/plugins/removeUselessStrokeAndFill';
import removeViewBox from 'svgo/plugins/removeViewBox';
import removeXMLProcInst from 'svgo/plugins/removeXMLProcInst';
import type { Processor } from '../index';

const pluginsData = {
  cleanupIDs,
  cleanupListOfValues,
  convertColors,
  collapseGroups,
  convertPathData,
  convertShapeToPath,
  mergePaths,
  removeDimensions,
  removeDesc,
  removeDoctype,
  removeEditorsNSData,
  removeEmptyAttrs,
  removeEmptyContainers,
  removeEmptyText,
  removeHiddenElems,
  removeMetadata,
  removeTitle,
  removeUselessDefs,
  removeUselessStrokeAndFill,
  removeViewBox,
  removeXMLProcInst,
};

const createSvgoPluginList = (options) => {
  const array = options
    .map(name => (pluginsData[name] ? pluginsData[name] : null))
    .filter(plugin => !!plugin);

  return array.reduce((previous: any, current: any) => {
    let groupExists = false;

    const results = previous.map((data: any) => {
      if (data[0].type === current.type) {
        groupExists = true;
        return [...data, current];
      }
      return data;
    });

    return !groupExists ? [...results, [current]] : results;
  }, [[array.shift()]]);
};

const normalizeErrorString = error => (
  error.split('\n').shift()
);

const svgoProcessor = (options: Array<string>): Processor => {
  const opts = createSvgoPluginList(options);

  return value => new Promise((resolve, reject) => {
    svg2js(value, (svg) => {
      if (svg.error) {
        reject(new Error(normalizeErrorString(svg.error)));
        return;
      }

      plugins(svg, opts);

      const jsx = js2svg(svg, {
        indent: '  ',
        pretty: true,
      }).data;

      resolve(jsx);
    });
  });
};

export default svgoProcessor;
