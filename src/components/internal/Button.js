// @flow
import styled from 'styled-components';
import { easings } from '../../styles';

const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 0;
  font-weight: bold;
  font-family: inherit;
  vertical-align: middle;
  line-height: 1.4;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  transition: all 180ms ${easings.easeOutQuart};

  &:focus {
    outline: none;
  }
`;

export default Button;
