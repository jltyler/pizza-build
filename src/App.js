import React, { Component } from 'react';
import './App.css';

import Header from './comp/header/Header';
import Builder from './comp/builder/Builder';
import History from './comp/history/History';
import Store from './comp/builder/Store';
import Confirm from './comp/confirm/Confirm';
import Helpers from './Helpers';

class App extends Component {
  orderState = null;

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
        return <Builder refreshAppState={this.refreshAppState} setCurrentDisplay={this.setCurrentDisplay}/>
      case 'history':
        return <History/>
      case 'confirm':
        return <Confirm order={this.orderState} confirmOrder={this.confirmOrder}/>
      default:
        return <div className="invalid-state">INVALID STATE</div>
    }
  }

  setCurrentDisplay = (newDisplay, options) => {
    console.log(newDisplay, options);
    
    if (this.state.display === newDisplay) return;
    if (newDisplay === 'confirm') {
      this.orderState = options;
      this.orderState.total = Helpers.calculateTotalPrice(this.orderState);
    }
    // if (this.state.display === 'builder') {
    //   console.log(this.builderRef)
    //   // this.builderRef.storeBuilderState()
    // }
    this.setState({
      display: newDisplay
    })
  }

  confirmOrder = () => {
    const order = {
      size: this.orderState.size,
      ingredients: {...this.orderState.ingredients},
      total: this.orderState.total,
    }
    for (const key in order.ingredients) {
        if (order.ingredients[key] === 0) delete order.ingredients[key];
    }
    Store.history.push(order)
    if ('builder' in Store) delete Store.builder;
    this.refreshAppState()
    this.setCurrentDisplay('history')
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
