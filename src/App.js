import React, { Component } from 'react';
import './App.css';

import Header from './comp/header/Header';
import Builder from './comp/builder/Builder';
import History from './comp/history/History';

class App extends Component {
  state = {
    display: 'builder',
  }

  getCurrentDisplay = () => {
    switch(this.state.display) {
      case 'builder':
        return <Builder></Builder>
      case 'history':
        return <History></History>
      default:
        return <div className="invalid-state">INVALID STATE</div>
    }
  }

  setCurrentDisplay = (newDisplay) => {
    if (this.state.display === newDisplay) return;
    this.setState({
      display: newDisplay
    })
  }

  render() {
    return (
      <div className="App">
        <Header displayChange={this.setCurrentDisplay}></Header>
        { this.getCurrentDisplay() }
      </div>
    );
  }
}

export default App;
