import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import { dripForm } from 'react-drip-form';
import { FieldGroup, Input, Checkbox } from 'react-drip-form-components';

const Field = styled.div`
  & label {
    display: block;
    margin: 0 0 0.2em;
    font-weight: bold;
    cursor: pointer;
  }
`;

const singleCheckbox = v => !!v;

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
      <Checkbox value="removeTitle">Remove <code>&lt;title&gt;</code></Checkbox>
      <Checkbox value="removeUselessDefs">Remove unused defs</Checkbox>
      <Checkbox value="removeUselessStrokeAndFill">Remove useless stroke & fill</Checkbox>
      <Checkbox value="removeViewBox">Remove viewBox</Checkbox>
      <Checkbox value="removeXMLProcInst">Remove XML instructions</Checkbox>
    </FieldGroup>

    <h3>Editor <small>powered by <a href="https://github.com/securingsincity/react-ace">react-ace</a></small></h3>
    <Flex mx={-2} mb={2}>
      <Box width={1/2} px={2}>
        <Field>
          <label htmlFor="editor-fontSize">Font size</label>
          <Input
            type="number"
            name="editor.fontSize"
            id="editor-fontSize"
            label="Font size"
          />
        </Field>
      </Box>
      <Box width={1/2} px={2}>
        <Field>
          <label htmlFor="editor-tabSize">Tab size</label>
          <Input
            type="number"
            id="editor-tabSize"
            name="editor.tabSize"
            label="Tab size"
          />
        </Field>
      </Box>
    </Flex>
    <Checkbox name="editor.useSoftTabs" value={true} parser={singleCheckbox}>Soft tab</Checkbox>
    <Checkbox name="editor.showGutter" value={true} parser={singleCheckbox}>Show Line Numbers</Checkbox>
  </div>
);

export default dripForm({
  validations: {
    'editor.fontSize': { required: true, number: true },
    'editor.tabSize': { required: true, number: true },
  },
  normalizers: {
    'editor.fontSize': { toInt: true, between: { min: 12, max: 30 } },
    'editor.tabSize': { toInt: true, between: { min: 2, max: 8 } },
  },
})(SettingsForm);
