import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import styled from 'styled-components';
import SettingsDialog from './SettingsDialog';
import Button from './internal/Button';
import { Cog } from '../icons/';
import firstChild from '../utils/firstChild';


const OpenButton = Button.extend`
  position: fixed;
  right: 20px;
  bottom: 80px;
  z-index: 999;
  width: 50px;
  height: 50px;
  padding: 0;
  overflow: hidden;
  background: #353954;
  border: 3px solid #fff;
  border-radius: 50px;
  box-shadow: none;
  color: #fff;
  font-weight: bold;
  transition-duration: 180ms;

  & svg {
    position: relative;
    z-index: 1;
    width: 1em;
    height: 1em;
    margin: 0;
    vertical-align: middle;
  }

  & span {
    display: inline-block;
    width: 0;
    opacity: 0;
    visibility: hidden;
    color: #4c5275;
    transition: all 80ms ease-out 80ms;
  }

  &:hover {
    width: 150px;
    background-color: #fff;
    color: #4c5275;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);

    & span {
      width: auto;
      opacity: 1;
      margin-left: 5px;
      visibility: visible;
    }
  }

  &:active {
    background-color: #eaeaea;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.11) inset;
  }
`;


export default class Settings extends Component {
  state = {
    open: false,
  };

  handleOpenClick = (e) => {
    e.preventDefault();
    this.setState({ open: true });
  };

  handleClose = (values) => {
    this.setState({ open: false });
    this.props.onChange(values);
  };

  render() {
    const { open } = this.state;
    const { settings } = this.props;

    return (
      <div>
        {/* Dialog */}
        <CSSTransitionGroup
          component={firstChild}
          transitionName="dialog"
          transitionEnterTimeout={320}
          transitionLeaveTimeout={120}
        >
          {open &&
            <SettingsDialog
              values={settings}
              onRequestClose={this.handleClose}
            />
          }
        </CSSTransitionGroup>

        {/* Open */}
        <OpenButton
          onClick={this.handleOpenClick}
        >
          <Cog />
          <span>Settings</span>
        </OpenButton>
      </div>
    );
  }
}
