// @flow
import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import { dripForm } from 'react-drip-form';
import { FieldGroup, Input, Checkbox } from 'react-drip-form-components';
import Button from './internal/Button';
import { palette, brighten } from '../styles';

const Field = styled.div`
  & label {
    display: block;
    margin: 0 0 0.2em;
    font-weight: bold;
    cursor: pointer;
  }
`;

const FormFooter = styled.div`
  margin-top: 60px;
  padding-top: 60px;
  border-top: 1px solid #e0e0e0;
  text-align: center;
`;

const ResetButton = Button.extend`
  height: 50px;
  padding: 0 1.6em;
  border-radius: 50px;
  background: ${palette.secondaryLight};
  color: #fff;

  &:hover {
    background: ${brighten(palette.secondaryLight, 1)};
    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.26);
  }

  &:active {
    background: ${brighten(palette.secondaryLight, 0.2)};
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.26);
  }
`;


const singleCheckbox = v => !!v;

type Props = {
  handlers: {
    onReset: Function; // eslint-disable-line react/no-unused-prop-types
  };
};


export const SettingsForm = ({ handlers: { onReset } }: Props) => (
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
      <Checkbox value="removeXMLProcInst">Remove XML instructions</Checkbox>
      <Checkbox value="removeXMLNS">Remove <code>xmlns</code> attribute</Checkbox>
    </FieldGroup>

    <h3>Editor <small>powered by <a href="https://github.com/securingsincity/react-ace">react-ace</a></small></h3>
    <Flex mx={-2} mb={2}>
      <Box width={1 / 2} px={2}>
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
      <Box width={1 / 2} px={2}>
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
    <Checkbox name="editor.useSoftTabs" value parser={singleCheckbox}>Soft tab</Checkbox>
    <Checkbox name="editor.showGutter" value parser={singleCheckbox}>Show Line Numbers</Checkbox>

    <FormFooter>
      <ResetButton onClick={onReset}>Reset to Default</ResetButton>
    </FormFooter>
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
