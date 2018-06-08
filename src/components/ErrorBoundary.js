import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {error: null,  errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          {this.state.error.toString()}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
