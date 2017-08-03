import React, { Component } from 'react';
import ReactDropzone from 'react-dropzone';
import wrapDisplayName from 'recompose/wrapDisplayName';


const withDroppable = WrappedComponent => (
  class Droppable extends Component {
    static displayName = wrapDisplayName(WrappedComponent, 'droppable');

    state = {
      isDragOver: false,
    };

    handleDrop = (files) => {
      if (files.length > 0 && typeof this.props.onDrop === 'function') {
        this.props.onDrop(files[0]);
      }

      this.setState({ isDragOver: false });
    };

    handleDragEnter = (e) => {
      this.setState({ isDragOver: true });

      if (typeof this.props.onDragEnter === 'function') {
        this.props.onDragEnter(e);
      }
    };

    handleDragLeave = (e) => {
      this.setState({ isDragOver: false });

      if (typeof this.props.onDragLeave === 'function') {
        this.props.onDragLeave(e);
      }
    };

    render() {
      const {
        onDrop,
        onDragEnter,
        onDragLeave,
        ...rest
      } = this.props;

      const { isDragOver } = this.state;

      return (
        <ReactDropzone
          disableClick
          disablePreview
          accept="image/svg+xml"
          multiple={false}
          style={{}}
          onDrop={this.handleDrop}
          onDragEnter={this.handleDragEnter}
          onDragLeave={this.handleDragLeave}
        >
          <WrappedComponent
            {...rest}
            isDragOver={isDragOver}
          />
        </ReactDropzone>
      );
    }
  }
);


export default withDroppable;
