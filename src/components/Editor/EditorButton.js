import React, { Component } from 'react';
import styled from 'styled-components';
import { palette } from '../../styles';
import Button from '../internal/Button';


const EditorButtonWrapper = Button.extend`
  padding: 0 20px;
  height: 40px;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  background: ${palette.secondaryDark};
  color: #fff;
  font-size: 0.75rem;

  &:hover {
    background-color: ${palette.secondaryLight};
  }

  &:active {
    background-color: #393f5d;
  }
`;

const IconWrapper = styled.span`
  display: inline-block;
  width: 1em;
  height: 1em;
  margin: 0 0.5em 0 0;

  & svg {
    width: 1em;
    height: 1em;
    fill: #fff;
  }
`;


export default class EditorButton extends Component {
  handleClick = (e) => {
    e.preventDefault();
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(e);
    }
  };

  render() {
    const {
      children,
      icon,
      onClick,
      ...rest,
    } = this.props;

    return (
      <EditorButtonWrapper
        {...rest}
        onClick={this.handleClick}
      >
        {icon &&
          <IconWrapper>{icon}</IconWrapper>
        }
        {children}
      </EditorButtonWrapper>
    );
  }
}
