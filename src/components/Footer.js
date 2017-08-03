import React from 'react';
import styled from 'styled-components';
import { palette } from '../styles';
import { Logo, GitHub } from './icons/';

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  height: 60px;
  background: ${palette.secondaryLight};
  color: #fff;
`;

/* eslint-disable no-nested-ternary */
const FooterCol = styled.div`
  flex: 1 1 33.3333%;
  font-size: 14px;
  padding-left: ${props => (props.left ? '20px' : '0')};
  padding-right: ${props => (props.right ? '20px' : '0')};
  text-align: ${props => (props.right ? 'right' : props.center ? 'center' : 'left')};

  & a {
    text-decoration: none;
    color: inherit;

    &:hover {
      text-decoration: underline;
    }
  }
`;
/* eslint-enable no-nested-ternary */

const FooterTitle = styled.h1`
  margin: 0;
  font-size: 1em;
  font-weight: normal;

  & small {
    display: block;
    margin: 0.2em 0 0;
    font-size: 0.78em;
  }
`;

const GitHubLink = styled.a`
  display: inline-block;
  margin: 0 0 0 20px;
  line-height: 1;
  vertical-align: middle;

  &:hover {
    opacity: 0.6;
  }
`;

const Footer = () => (
  <FooterWrapper>
    <FooterCol left>
      <FooterTitle>
        SVG to JSX with GUI
        <small>Open Source Tool</small>
      </FooterTitle>
    </FooterCol>

    <FooterCol center style={{ lineHeight: 1 }}>
      <Logo
        width={51}
        height={33}
      />
    </FooterCol>

    <FooterCol right>
      Made with <span style={{ fontSize: '1.28em', color: palette.accent }}>&#9829;</span> <a href="https://github.com/tsuyoshiwada">@tsuyoshiwada</a>.
      <GitHubLink href="__todo__">
        <GitHub />
      </GitHubLink>
    </FooterCol>
  </FooterWrapper>
);

export default Footer;
