// @flow
import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import styled from 'styled-components';
import { palette, easings } from '../styles';
import { Warning } from './icons/';
import firstChild from '../utils/firstChild';


const Popover = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 80px;
  left: 50%;
  z-index: 3000;
  background: ${palette.danger};
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
  color: #fff;
  font-size: 0.75rem;
  font-weight: bold;
  transform: translate(-50%, 0);
  transition-property: opacity, visibility, transform;
  transition-timing-function: ${easings.easeOutQuart};

  & > div {
    flex: 1 1 auto;

    &:nth-child(1) {
      padding: 1em;
      background: ${palette.dangerDark};
    }

    &:nth-child(2) {
      padding: 1em 1.5em;
    }
  }

  &.popover-enter {
    opacity: 0;
    visibility: hidden;
    transform: translate(-50%, 10px);
    transition-duration: 320ms;
  }

  &.popover-enter.popover-enter-active {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, 0);
  }

  &.popover-leave {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, 0);
    transition-duration: 120ms;
  }

  &.popover-leave.popover-leave-active {
    opacity: 0;
    visibility: hidden;
    transform: translate(-50%, 5px);
  }
`;


type Props = {
  children: ?React$Node<any>;
};

const ErrorPopover = ({ children }: Props) => (
  <CSSTransitionGroup
    component={firstChild}
    transitionName="popover"
    transitionEnterTimeout={320}
    transitionLeaveTimeout={120}
  >
    {children &&
      <Popover>
        <div>
          <Warning width={16} height={16} />
        </div>
        <div>
          {children}
        </div>
      </Popover>
    }
  </CSSTransitionGroup>
);


export default ErrorPopover;
