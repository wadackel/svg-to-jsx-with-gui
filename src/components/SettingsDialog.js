import React, { Component } from 'react';
import styled from 'styled-components';
import keycode from 'keycode';
import { easings } from '../styles';
import SettingsForm from './SettingsForm';
import Button from './internal/Button';
import { Close } from './icons/';

const DialogWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 60px;
  left: 0;
  z-index: 1000;
  padding: 0 30px 120px;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  transition-property: opacity, visibility, transform;
  transition-timing-function: ${easings.easeOutQuart};

  &:focus {
    outline: none;
  }

  &.dialog-enter {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-15px);
  }

  &.dialog-enter.dialog-enter-active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    transition-duration: 420ms;
  }

  &.dialog-leave {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  &.dialog-leave.dialog-leave-active {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-5px);
    transition-duration: 120ms;
  }
`;

const DialogInner = styled.div`
  width: 540px;
  margin: 0 auto;

  & h2 {
    margin: 60px 0;
    font-size: 2.62rem;
  }

  & h3 {
    margin: 60px 0 30px;
    font-size: 1.5rem;

    & small {
      font-size: 0.75rem;
    }
  }

  & code {
    display: inline-block;
    padding: 0.1em 0.4em;
    background: #f0f0f0;
    border-radius: 3px;
    font-size: 0.85em;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  }
`;

const CloseButton = Button.extend`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 70px;
  height: 70px;
  background: #f7f7f7;
  border-radius: 50%;
  box-shadow: none;
  font-size: 0.68rem;
  font-weight: normal;

  & svg {
    display: block;
    width: 14px;
    height: 14px;
    margin: 3px auto 2px;
  }

  &:hover {
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
  }

  &:active {
    background-color: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.11);
  }
`;


export default class SettingsDialog extends Component {
  mounted = false;

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleRef = (dialog) => {
    this.dialog = dialog;
  };

  handleFormRef = (form) => {
    this.form = form;
  };

  handleTransitionEnd = (e) => {
    if (this.mounted && e.target === this.dialog) {
      this.dialog.focus();
    }
  };

  handleKeyDown = (e) => {
    if (keycode(e) === 'esc' && this.form.isValid()) {
      this.props.onRequestClose(this.form.getValues());
    }
  };

  handleCloseClick = (e) => {
    e.preventDefault();

    if (this.form.isValid()) {
      this.props.onRequestClose(this.form.getValues());
    }
  };

  render() {
    const { values, onChange } = this.props;

    return (
      <DialogWrapper
        innerRef={this.handleRef}
        tabIndex="-1"
        onKeyDown={this.handleKeyDown}
        onTransitionEnd={this.handleTransitionEnd}
      >
        <CloseButton onClick={this.handleCloseClick}>
          <div>
            <Close />
            Close
          </div>
        </CloseButton>

        <DialogInner style={this.state}>
          <SettingsForm
            onInitialize={this.handleFormRef}
            values={values}
            onChange={onChange}
          />
        </DialogInner>
      </DialogWrapper>
    );
  }
}
