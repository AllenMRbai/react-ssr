import React, { Component } from 'react';

export default class index extends Component {
  state = {
    name: 'topic detail',
  };

  render() {
    const { name } = this.state;

    return <div>{name}</div>;
  }
}
