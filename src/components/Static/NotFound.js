import React, { Component } from 'react';

export default class Error extends Component {
  
  render() {
    return (
      <div className="container notFound">
          <h1>404 Error</h1>
          <p>We can't seem to find the page you're looking for.</p>
      </div>
    );
  }
}
