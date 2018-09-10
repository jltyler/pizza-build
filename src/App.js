import React, { Component } from 'react';
import './App.css';

import Header from './comp/header/Header';
import Builder from './comp/builder/Builder';

class App extends Component {
  state = {
    display: 'builder',
  }

  getCurrentMainPage = () => {
    switch(this.state.display) {
      case 'builder':
        return <Builder></Builder>
      case 'history':
        return <div>GOIN DOWN IN HISTORY</div>
      default:
        return <div className="invalid-state">INVALID STATE</div>
    }
  }

  render() {
    return (
      <div className="App">
        <Header></Header>
        { this.getCurrentMainPage() }
      </div>
    );
  }
}

export default App;
