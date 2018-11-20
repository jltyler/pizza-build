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

  lastDisplay = 'builder';

  state = {
    display: 'builder',
    historyEntries: 0
  }

  refreshAppState = () => {
    this.setState({
      historyEntries: Store.history.length
    });
  }

  getCurrentDisplay = () => {
    switch(this.state.display) {
      case 'builder':
        return <Builder refreshAppState={this.refreshAppState} setCurrentDisplay={this.setCurrentDisplay}/>;
      case 'history':
        return <History/>;
      case 'confirm':
        return <Confirm order={this.orderState} confirmOrder={this.confirmOrder} goBack={this.previousDisplay} />;
      default:
        return <div className="invalid-state">INVALID STATE</div>;
    }
  }

  setCurrentDisplay = (newDisplay, options) => {
    console.log(newDisplay, options);

    if (this.state.display === newDisplay) return;
    this.lastDisplay = this.state.display;
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
    });
  }

  previousDisplay = () => {
    if (this.lastDisplay === this.state.display) return;
    this.setCurrentDisplay(this.lastDisplay);
  }

  confirmOrder = () => {
    const order = {
      size: this.orderState.size,
      ingredients: {...this.orderState.ingredients},
      total: this.orderState.total,
    };
    for (const key in order.ingredients) {
        if (order.ingredients[key] === 0) delete order.ingredients[key];
    }
    Store.history.push(order);
    if ('builder' in Store) delete Store.builder;
    this.refreshAppState();
    this.setCurrentDisplay('history');
  }

  render() {
    return (
      <div className="App">
      <div className="fetch-test">
        <button onClick={() => {
          fetch('https://jsonplaceholder.typicode.com/users')
          .then((r) => console.log(r), r.json())
          .then((j) => console.log(j))
          .catch((e) => console.error(e));
          }}>Hmm...</button>
      </div>
        <Header displayChange={this.setCurrentDisplay} historyEntries={this.state.historyEntries} />
        { this.getCurrentDisplay() }
      </div>
    );
  }
}

export default App;
