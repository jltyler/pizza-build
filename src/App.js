import React, { Component } from 'react';
import './App.css';

import Header from './comp/header/Header';
import Builder from './comp/builder/Builder';
import History from './comp/history/History';
import Store from './comp/builder/Store';

class App extends Component {
  state = {
    display: 'builder',
    historyEntries: 0
  }

  refreshAppState = (e) => {
    this.setState({
      historyEntries: Store.history.length
    })
  }

  getCurrentDisplay = () => {
    switch(this.state.display) {
      case 'builder':
        return <Builder refreshAppState={this.refreshAppState} />
      case 'history':
        return <History/>
      default:
        return <div className="invalid-state">INVALID STATE</div>
    }
  }

  setCurrentDisplay = (newDisplay) => {
    if (this.state.display === newDisplay) return;
    // if (this.state.display === 'builder') {
    //   console.log(this.builderRef)
    //   // this.builderRef.storeBuilderState()
    // }
    this.setState({
      display: newDisplay
    })
  }

  render() {
    return (
      <div className="App">
        <Header displayChange={this.setCurrentDisplay} historyEntries={this.state.historyEntries} />
        { this.getCurrentDisplay() }
      </div>
    );
  }
}

export default App;
