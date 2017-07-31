import React, { Component } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
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
  height: 50px;
  padding: 0 30px;
  background: #353954;
  border: 3px solid #fff;
  border-radius: 50px;
  box-shadow: none;
  color: #fff;
  font-weight: bold;

  & svg {
    width: 1em;
    height: 1em;
    margin: 0 0.5em 0 0;
    vertical-align: middle;
  }

  &:hover {
    background-color: #fff;
    color: #4c5275;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
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

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      open,
    } = this.state;

    return (
      <div>
        {/* Dialog */}
        <TransitionGroup component={firstChild}>
          {open &&
            <SettingsDialog
              onRequestClose={this.handleClose}
            />
          }
        </TransitionGroup>

        {/* Open */}
        <OpenButton
          onClick={this.handleOpenClick}
        >
          <Cog />
          Settings
        </OpenButton>
      </div>
    );
  }
}
