import React from 'react';
import { dripForm } from 'react-drip-form';
import { FieldGroup, Checkbox } from 'react-drip-form-components';

export const SettingsForm = () => (
  <div>
    <h2>Settings</h2>

    <h3>SVG <small>svg transformer</small></h3>
    <FieldGroup name="svgoPlugins" multiple>
      <Checkbox value="cleanupIDs">Clean IDs</Checkbox>
      <Checkbox value="cleanupListOfValues">Round / rewrite number lists</Checkbox>
      <Checkbox value="cleanupNumericValues">Round / rewrite numbers</Checkbox>
      <Checkbox value="convertColors">Minify colours</Checkbox>
      <Checkbox value="collapseGroups">Collapse useless groups</Checkbox>
      <Checkbox value="convertPathData">Round/rewrite paths</Checkbox>
      <Checkbox value="convertShapeToPath">Shapes to (smaller) paths</Checkbox>
      <Checkbox value="mergePaths">Merge paths</Checkbox>
      <Checkbox value="removeDimensions">Prefer viewBox to width / height</Checkbox>
      <Checkbox value="removeDesc">Remove <code>&lt;desc&gt;</code></Checkbox>
      <Checkbox value="removeDoctype">Remove doctype</Checkbox>
      <Checkbox value="removeEditorsNSData">Remove editor data</Checkbox>
      <Checkbox value="removeEmptyAttrs">Remove empty attrs</Checkbox>
      <Checkbox value="removeEmptyContainers">Remove empty containers</Checkbox>
      <Checkbox value="removeEmptyText">Remove empty text</Checkbox>
      <Checkbox value="removeHiddenElems">Remove hidden elements</Checkbox>
      <Checkbox value="removeMetadata">Remove <code>&lt;metadata&gt;</code></Checkbox>
      <Checkbox value="removeMetadata">Remove <code>&lt;title&gt;</code></Checkbox>
      <Checkbox value="removeUselessDefs">Remove unused defs</Checkbox>
      <Checkbox value="removeUselessStrokeAndFill">Remove useless stroke & fill</Checkbox>
      <Checkbox value="removeViewBox">Remove viewBox</Checkbox>
      <Checkbox value="removeXMLProcInst">Remove XML instructions</Checkbox>
    </FieldGroup>
  </div>
);

export default dripForm()(SettingsForm);
