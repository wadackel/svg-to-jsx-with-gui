// @flow
import React from 'react';
import styled from 'styled-components';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { easings } from '../styles';
import firstChild from '../utils/firstChild';
import withDroppable from './hoc/withDroppable';


const DropzoneOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.96);
  transition-property: opacity, visibility, transform;
  transition-timing-function: ${easings.easeOutQuart};

  &.overlay-enter {
    opacity: 0;
    visibility: hidden;
    transform: scale(1.05);
  }

  &.overlay-enter.overlay-enter-active {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
    transition-duration: 180ms;
  }

  &.overlay-leave {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }

  &.overlay-leave.overlay-leave-active {
    opacity: 0;
    visibility: hidden;
    transform: scale(0.95);
    transition-duration: 80ms;
  }

  &::before {
    position: absolute;
    top: 20px;
    right: 20px;
    bottom: 20px;
    left: 20px;
    z-index: 1;
    border: 2px dashed rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    content: '';
  }

  & > div {
    position: relative;
    z-index: 2;
    text-align: center;
  }

  & h2 {
    margin: 0 0 0.2em;
    font-size: 2.87rem;
  }

  & p {
    margin: 0;
    font-size: 0.87rem;
  }
`;


type Props = {
  children: React$Node<any>;
  isDragOver: boolean;
};


export const Droppable = ({ children, isDragOver }: Props) => (
  <div>
    <CSSTransitionGroup
      component={firstChild}
      transitionName="overlay"
      transitionEnterTimeout={180}
      transitionLeaveTimeout={80}
    >
      {isDragOver &&
        <DropzoneOverlay>
          <div>
            <h2>DRAG &amp; DROP</h2>
            <p>Let&#39;s drop your svg file!</p>
          </div>
        </DropzoneOverlay>
      }
    </CSSTransitionGroup>

    {children}
  </div>
);

export default withDroppable(Droppable);
