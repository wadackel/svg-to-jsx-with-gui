// @flow
import React from 'react';

const firstChild = (props: any): ?React$Node<*> => {
  const array = React.Children.toArray(props.children);

  return array[0] || null;
};

export default firstChild;
