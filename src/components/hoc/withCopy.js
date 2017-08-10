// @flow
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import wrapDisplayName from 'recompose/wrapDisplayName';
import Clipboard from 'clipboard';


type Props = {
  renderer: (success: boolean, failure: boolean) => React$Node<any>;
  statusTimeout?: number;
  textBy?: Function;
  onCopySuccess?: ?Function;
  onCopyFailure?: ?Function;
};

type State = {
  success: boolean;
  failure: boolean;
};


const withCopy = (WrappedComponent: Class<React$Component<*, *, *>>) => (
  class CopyableComponent extends Component {
    static displayName = wrapDisplayName(WrappedComponent, 'copyable');
    static defaultProps = {
      statusTimeout: 1000,
      textBy: () => '',
      onCopySuccess: null,
      onCopyFailure: null,
    };

    props: Props;
    state: State = {
      success: false,
      failure: false,
    };

    timer: number = 0;
    element: ?HTMLElement;
    clipboard: any;

    componentWillUnmount() {
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

    handleRef = (node: *) => {
      const element = ReactDOM.findDOMNode(node); // eslint-disable-line

      if (element instanceof HTMLElement) {
        this.clipboard = new Clipboard(this.element, {
          text: trigger => (
            typeof this.props.textBy === 'function' ? this.props.textBy(trigger) : ''
          ),
        });

        this.clipboard.on('success', this.handleSuccess);
        this.clipboard.on('error', this.handleSuccess);
      }
    };

    handleSuccess = (e: any) => {
      this.success();
      this.startClearTimeout();

      if (typeof this.props.onCopySuccess === 'function') {
        this.props.onCopySuccess(e);
      }
    };

    handleFailure = (e: any) => {
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
