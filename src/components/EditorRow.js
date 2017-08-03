import styled from 'styled-components';
import { palette, darken } from '../styles';

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

export default EditorRow;
