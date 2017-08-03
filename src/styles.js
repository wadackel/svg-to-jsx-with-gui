import chroma from 'chroma-js';

export const palette = {
  primary: '#f1e684',
  secondaryDark: '#31364f',
  secondary: '#353a54',
  secondaryLight: '#4c5275',
  accent: '#fd379a',
  danger: '#f44336',
  dangerDark: '#d32f2f',
};

export const easings = {
  easeOutQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
};

export const darken = (color, value) => chroma(color).darken(value);
export const brighten = (color, value) => chroma(color).brighten(value);
