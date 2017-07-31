import React from 'react';

const firstChild = (props) => {
  const array = React.Children.toArray(props.children);

  return array[0] || null;
};

export default firstChild;
