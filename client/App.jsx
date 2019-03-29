import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';

@hot
class App extends Component {
  sayHello = () => {
    console.log('hello world');
  };

  render() {
    return (
      <div>
        <h1>123111454</h1>
        <input type="text" />
        <button type="button" onClick={this.sayHello}>
          点击说你好
        </button>
      </div>
    );
  }
}

export default App;
