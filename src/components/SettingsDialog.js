import React, { Component } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import styled from 'styled-components';
import Prefixer from 'inline-style-prefixer';
import SettingsForm from './SettingsForm';
import Button from './internal/Button';
import { Close } from '../icons/';

const prefixer = new Prefixer();

const Duration = {
  ENTER: 220,
  LEAVE: 80,
};

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
  constructor(props) {
    super(props);

    this.state = prefixer.prefix({
      transition: `all ${Duration.ENTER}ms ease-out`,
    });
  }

  setStyles(styles, callback) {
    this.setState(prefixer.prefix({
      ...this.state.styles,
      ...styles,
    }), callback);
  }

  componentWillEnter(callback) {
    this.setStyles({
      opacity: 0,
      transform: 'translateY(-10px)',
    });

    setTimeout(callback, 16);
  }

  componentDidEnter() {
    this.setStyles({
      opacity: 1,
      transform: 'translateY(0)',
    });
  }

  componentWillLeave(callback) {
    this.setStyles({
      opacity: 0,
      transform: 'translateY(0)',
      transition: `all ${Duration.LEAVE}ms ease-out`,
    });
    setTimeout(callback, Duration.LEAVE);
  }

  handleCloseClick = (e) => {
    e.preventDefault();

    if (typeof this.props.onRequestClose === 'function') {
      this.props.onRequestClose();
    }
  };

  render() {
    return (
      <DialogWrapper style={this.state}>
        <DialogInner>
          <CloseButton onClick={this.handleCloseClick}>
            <div>
              <Close />
              Close
            </div>
          </CloseButton>

          <SettingsForm
            onChange={console.log}
          />
        </DialogInner>
      </DialogWrapper>
    );
  }
}
