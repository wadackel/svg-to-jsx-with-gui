/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import wrapDisplayName from 'recompose/wrapDisplayName';
import Clipboard from 'clipboard';


const withCopy = WrappedComponent => (
  class CopyableComponent extends Component {
    static displayName = wrapDisplayName(WrappedComponent, 'copyable');

    static defaultProps = {
      statusTimeout: 1000,
    };

    state = {
      success: false,
      error: false,
    };

    timer = 0;

    componentWillUnmount() {
      this.node = null;
      this.element = null;
      this.clipboard.destroy();
    }

    success() {
      this.setState({
        success: true,
        failure: false,
      });
    }

    failure() {
      this.setState({
        success: false,
        failure: true,
      });
    }

    clear() {
      this.setState({
        success: false,
        failure: false,
      });
    }

    startClearTimeout() {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(() => {
        this.clear();
      }, this.props.statusTimeout);
    }

    handleRef = (node) => {
      this.node = node;
      this.element = ReactDOM.findDOMNode(node);

      this.clipboard = new Clipboard(this.element, {
        text: trigger => (
          typeof this.props.textBy === 'function' ? this.props.textBy(trigger) : ''
        ),
      });

      this.clipboard.on('success', this.handleSuccess);
      this.clipboard.on('error', this.handleSuccess);
    };

    handleSuccess = (e) => {
      this.success();
      this.startClearTimeout();

      if (typeof this.props.onCopySuccess === 'function') {
        this.props.onCopySuccess(e);
      }
    };

    handleFailure = (e) => {
      this.failure();
      this.startClearTimeout();

      if (typeof this.props.onCopyFailure === 'function') {
        this.props.onCopyFailure(e);
      }
    };

    render() {
      const {
        renderer,
        textBy,
        onCopySuccess,
        onCopyFailure,
        ...rest
      } = this.props;

      const {
        success,
        failure,
      } = this.state;

      return (
        <WrappedComponent
          ref={this.handleRef}
          {...rest}
        >
          {renderer(success, failure)}
        </WrappedComponent>
      );
    }
  }
);


export default withCopy;
